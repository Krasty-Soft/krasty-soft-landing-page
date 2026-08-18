#!/usr/bin/env python3
"""
Anonymize a client audit report so it can be shown to a third party as a work sample.

Strips direct identifiers (client/product name, production URLs, hosting project
references, commit hash) and replaces the engagement-status callout with an
anonymization + confidentiality notice. Technical substance — file:line anchors,
severities, reasoning — is preserved, because that is the point of the sample.

    python3 anonymize_report.py <input.md> <output.md> [--codename NAME]

IMPORTANT — what this does NOT remove: the product *domain*. The findings discuss
domain-specific obligations, so a reader in the same industry can infer the sector
(not the company). If the sample must not reveal the sector either, the
domain-specific sections have to be cut by hand — see DOMAIN_TELLS below for where
they are.
"""

import re
import sys

DEFAULT_CODENAME = "Northwind"

# Terms that reveal the product's sector. Not replaced (they carry the
# domain-expertise value of the sample) — listed so a human can audit the
# residual inference risk, and cut sections if the sector must be hidden too.
DOMAIN_TELLS = [
    "EIN", "BOI", "FinCEN", "501(c)(3)", "Form 990", "Form 1023",
    "LLC", "C-Corp", "S-Corp", "nonprofit", "franchise tax", "annual report",
]


def anonymize(text: str, codename: str) -> tuple[str, list[str]]:
    """Return (anonymized_text, notes)."""
    notes = []

    def sub(pattern, repl, label, flags=0):
        nonlocal text
        text, n = re.subn(pattern, repl, text, flags=flags)
        if n:
            notes.append(f"{label}: {n} replaced")
        return n

    # 1. Production / preview deployment URLs — the highest-risk leak, because the
    #    findings describe live, unfixed vulnerabilities.
    sub(r'`[a-z0-9-]+\.vercel\.app`', '`[deployment URL withheld]`',
        "Vercel deployment URL")
    sub(r'https?://[a-z0-9.-]+\.(?:vercel\.app|supabase\.co)\S*',
        '[URL withheld]', "absolute app/hosting URL")

    # 2. Hosting project references (dashboard project name / project ref).
    sub(r'Supabase dashboard — project `[^`]+`',
        'Supabase dashboard — project `[withheld]`', "Supabase project reference")
    sub(r'\b[a-z]{20}\b', '[project-ref withheld]', "Supabase project ref (20-char)")

    # 3. Commit hash — identifying if the reader ever gains repo access.
    sub(r'\*\*Reviewed at commit\*\* `[0-9a-f]{7,40}`',
        '**Reviewed at a fixed commit**', "commit hash")

    # 4. The client/product name itself. Do this last so earlier patterns can
    #    still match on the original name.
    sub(r'\bStructureBiz\b', codename, "product name")
    sub(r'\bstructurebiz\b', codename.lower(), "product name (lowercase)")

    return text, notes


def replace_status_callout(text: str) -> str:
    """Swap the engagement-status blockquote for a sample/confidentiality notice.

    The original callout describes in-flight engagement state (pending items,
    awaiting client access) which is confusing and needlessly revealing in a
    work sample.
    """
    notice = (
        "> **Anonymized work sample.** This is a real audit deliverable, reproduced with the\n"
        "> client's identifying details removed: the product name is replaced with a codename, and\n"
        "> deployment URLs, hosting project references and the reviewed commit are withheld. The\n"
        "> findings, severities, reasoning and source references are unaltered and are exactly as\n"
        "> delivered. A small number of items were still pending live-environment confirmation at\n"
        "> the time this snapshot was taken and are marked accordingly.\n"
        ">\n"
        "> **Confidential.** The issues described here were unresolved when this report was\n"
        "> written. Please treat this document as confidential and do not redistribute it.\n"
    )
    # Replace the first blockquote block that follows the cover meta.
    lines = text.split("\n")
    start = end = None
    for i, line in enumerate(lines):
        if line.startswith("> ") and start is None:
            start = i
        elif start is not None and not line.startswith(">"):
            end = i
            break
    if start is None:
        return text
    if end is None:
        end = len(lines)
    return "\n".join(lines[:start]) + "\n" + notice + "\n".join(lines[end:])


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) < 2:
        print(__doc__)
        return 1
    codename = DEFAULT_CODENAME
    if "--codename" in sys.argv:
        codename = sys.argv[sys.argv.index("--codename") + 1]

    src, dst = args[0], args[1]
    with open(src, encoding="utf-8") as f:
        text = f.read()

    text, notes = anonymize(text, codename)
    text = replace_status_callout(text)

    # Subject line: rewrite to say the name is withheld rather than naming a codename
    # as though it were the real product.
    text = re.sub(
        r'\*\*Subject:\*\*.*?(?=\n\*\*|\n\n)',
        f'**Subject:** "{codename}" — client name withheld. Reviewed as deployed to production\n'
        f'and as stored in the private source repository provided.',
        text, count=1, flags=re.S,
    )

    with open(dst, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"wrote {dst}  (codename: {codename})")
    for n in notes:
        print(f"  - {n}")

    # Residual-risk report: verify nothing obvious survived, and surface domain tells.
    leftovers = [t for t in ("StructureBiz", "structurebiz", "vercel.app", "supabase.co")
                 if t.lower() in text.lower()]
    print(f"  ! residual direct identifiers: {leftovers or 'none'}")
    present = [t for t in DOMAIN_TELLS if t.lower() in text.lower()]
    print(f"  ! domain tells still present (by design): {', '.join(present) or 'none'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
