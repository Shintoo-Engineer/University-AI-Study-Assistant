import re


def clean_text(text: str) -> str:
    """
    Clean PDF extraction artifacts and normalize text.
    """

    # ---------------------------------------------------------
    # 1. Remove PDF watermarks / source artifacts
    # ---------------------------------------------------------

    patterns = [
        r"lOMoARcPSD\|\d+",
        r"EnggTree\.com",
        r"Downloaded from",
        r"www\.",
    ]

    for pattern in patterns:
        text = re.sub(
            pattern,
            "",
            text,
            flags=re.IGNORECASE
        )

    # ---------------------------------------------------------
    # 2. Fix common PDF word-splitting artifacts
    # ---------------------------------------------------------

    replacements = {
        "servi ce": "service",
        "Compone nts": "Components",
        "Environme nt": "Environment",
        "Virtual ization": "Virtualization",
        "virtual ization": "virtualization",
        "configurat ion": "configuration",
        "cont ainers": "containers",
        "cont ainer": "container",
        "applicat ion": "application",
        "communicat ion": "communication",
        "manageme nt": "management",
        "developme nt": "development",
        "informat ion": "information",
        "implementat ion": "implementation",
        "distribut ion": "distribution",
        "interact ion": "interaction",
        "organiz ation": "organization",
        "comput ing": "computing",
        "stor age": "storage",
        "net working": "networking",
        "se curity": "security",
        "t o ": " to ",
        "a nd ": " and ",
        "o f ": " of ",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    # ---------------------------------------------------------
    # 3. Normalize spaces
    # ---------------------------------------------------------

    text = re.sub(r"[ \t]+", " ", text)

    # ---------------------------------------------------------
    # 4. Clean spaces around newlines
    # ---------------------------------------------------------

    text = re.sub(r" *\n *", "\n", text)

    # ---------------------------------------------------------
    # 5. Remove excessive blank lines
    # ---------------------------------------------------------

    text = re.sub(r"\n\s*\n+", "\n\n", text)

    return text.strip()