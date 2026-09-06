import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


# ============================================================
# LOCAL LLM
# ============================================================

MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"

print("Loading local LLM...")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    dtype=torch.float32
)

model.eval()

print("Local LLM loaded successfully.")


# ============================================================
# GENERATE ANSWER
# ============================================================

def generate_answer(
    question: str,
    context: str
) -> str:
    """
    Generate an answer using only the retrieved
    university study materials.

    Page citations such as [Page 91] should be
    included when supported by the context.
    """

    messages = [
        {
            "role": "system",
            "content": (
                "You are a university study assistant.\n\n"

                "Answer the student's question using ONLY "
                "the provided university study materials.\n"

                "Do not use outside knowledge.\n"
                "Do not invent information.\n"

                "Use page citations in the format [Page X] "
                "when the provided source contains a page number.\n"

                "Only cite pages that are actually provided "
                "in the source context.\n\n"

                "Follow these rules:\n"
                "1. Answer the exact question asked.\n"
                "2. Start with a direct definition or answer.\n"
                "3. Give only information relevant to the question.\n"
                "4. If the question asks for types, components, "
                "features, advantages, disadvantages, or steps, "
                "use a numbered list.\n"
                "5. Keep the answer concise but complete.\n"
                "6. Do not repeat information.\n"
                "7. Do not mention retrieval, Qdrant, the AI, "
                "or the prompt.\n"
                "8. Do not invent page numbers.\n"
                "9. If the sources do not contain enough information, "
                "say that the information is not available in the "
                "provided study materials."
            ),
        },
        {
            "role": "user",
            "content": (
                "SOURCE MATERIALS:\n"
                "================\n"
                f"{context}\n\n"

                "QUESTION:\n"
                "=========\n"
                f"{question}\n\n"

                "Give the final answer directly."
            ),
        },
    ]

    prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=4096
    )

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=180,
            do_sample=False,
            repetition_penalty=1.1
        )

    generated_tokens = outputs[0][
        inputs["input_ids"].shape[1]:
    ]

    answer = tokenizer.decode(
        generated_tokens,
        skip_special_tokens=True
    )

    return answer.strip()