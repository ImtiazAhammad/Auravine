#!/usr/bin/env bash
# Fails when a tracked file (or, with --history, any commit) contains something shaped like a
# real credential. Prints the file and line number, never the matched value.
#   scripts/check-secrets.sh            tracked files
#   scripts/check-secrets.sh --history  every commit on every branch
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

PATTERNS='sb_secret_[A-Za-z0-9_-]{16,}|eyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}|AIza[0-9A-Za-z_-]{35}|gsk_[A-Za-z0-9]{30,}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[abprs]-[A-Za-z0-9-]{10,}|(vercel|VERCEL)[_A-Za-z]*TOKEN[ =:"]+[A-Za-z0-9]{20,}'
SELF=':!scripts/check-secrets.sh'

if [ "${1:-}" = "--history" ]; then
    hits=$(git log --all -G"$PATTERNS" --format='%h' -- . "$SELF" ':!node_modules' | sort -u || true)
    if [ -n "$hits" ]; then
        echo "Credential-shaped text appears in these commits (values not shown):"
        echo "$hits"
        exit 1
    fi
    echo "history clean"
    exit 0
fi

if git grep -nIE -e "$PATTERNS" -- . "$SELF" | sed -E 's/:[^:]*$/: <redacted>/' | grep . ; then
    echo "Credential-shaped text found in tracked files (values hidden)." >&2
    exit 1
fi
echo "no credential-shaped text in tracked files"
