import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"


print("Loading local LLM...")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    dtype=torch.float32
)

model.eval()

print("Local LLM loaded successfully.")


def generate_answer(question: str, context: str) -> str:
    """
    Generate a university-style answer using only retrieved notes.
    """

    # Clearly separate retrieved sources
    formatted_context = f"""
SOURCE 1
--------
{context}
"""

    messages = [
        {
            "role": "system",
            "content": (
                "You are a university study assistant.\n"
                "Answer the student's question using ONLY the provided sources.\n"
                "Do not use outside knowledge.\n"
                "Do not mention sources, retrieval, or the AI.\n\n"

                "Follow these rules:\n"
                "1. Answer the exact question asked.\n"
                "2. Start with a direct definition or answer.\n"
                "3. Give only information relevant to the question.\n"
                "4. If the question asks for types, components, features, "
                "advantages, disadvantages, or steps, use a numbered list.\n"
                "5. Keep the answer concise but complete.\n"
                "6. Do not repeat information.\n"
                "7. Do not invent information."
            ),
        },
        {
            "role": "user",
            "content": (
                f"{formatted_context}\n\n"
                f"QUESTION:\n{question}\n\n"
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