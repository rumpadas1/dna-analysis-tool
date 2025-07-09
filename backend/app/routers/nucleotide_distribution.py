from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from collections import Counter

router = APIRouter()

class SequenceInput(BaseModel):
    sequence: str

@router.post("/")  # ✅ Corrected endpoint
def nucleotide_distribution(data: SequenceInput):
    sequence = data.sequence.upper()
    valid_nucleotides = "ATGC"

    if any(nuc not in valid_nucleotides for nuc in sequence):
        raise HTTPException(status_code=400, detail="Invalid characters in DNA sequence.")

    count = Counter(sequence)
    total = sum(count[n] for n in valid_nucleotides)

    distribution = {
        "A": count.get("A", 0) / total,
        "T": count.get("T", 0) / total,
        "G": count.get("G", 0) / total,
        "C": count.get("C", 0) / total,
    }

    return {
        "counts": dict(count),
        "distribution": distribution
    }
