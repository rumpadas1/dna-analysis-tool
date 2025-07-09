from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

hydrophobicity_scores = {
    'A': 1.8, 'R': -4.5, 'N': -3.5, 'D': -3.5, 'C': 2.5,
    'Q': -3.5, 'E': -3.5, 'G': -0.4, 'H': -3.2, 'I': 4.5,
    'L': 3.8, 'K': -3.9, 'M': 1.9, 'F': 2.8, 'P': -1.6,
    'S': -0.8, 'T': -0.7, 'W': -0.9, 'Y': -1.3, 'V': 4.2
}

class SequenceInput(BaseModel):
    sequence: str

@router.post("/")
def analyze_amino_acids(data: SequenceInput):
    sequence = data.sequence.upper()
    if any(residue not in hydrophobicity_scores for residue in sequence):
        raise HTTPException(status_code=400, detail="Invalid amino acid in sequence")

    result = {res: hydrophobicity_scores[res] for res in sequence if res in hydrophobicity_scores}
    return {"hydrophobicity": result}
