from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class SequenceInput(BaseModel):
    sequence: str

def calculate_solubility(sequence: str) -> float:
    hydrophilic = set("RNDQEHK")
    hydrophobic = set("AILMFWV")

    total = len(sequence)
    if total == 0:
        raise ValueError("Sequence cannot be empty.")

    hydrophilic_count = sum(1 for aa in sequence if aa in hydrophilic)
    hydrophobic_count = sum(1 for aa in sequence if aa in hydrophobic)

    score = hydrophilic_count - hydrophobic_count
    solubility_index = (hydrophilic_count / total) * 100

    return solubility_index

@router.post("/")
def protein_solubility(data: SequenceInput):
    sequence = data.sequence.upper()

    if not sequence.isalpha():
        raise HTTPException(status_code=400, detail="Sequence must only contain amino acid letters.")

    try:
        solubility = calculate_solubility(sequence)
        return {"solubility_index": round(solubility, 2)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
