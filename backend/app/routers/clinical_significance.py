from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class DNAInput(BaseModel):
    sequence: str

# Simulated known variants with clinical significance
clinical_db = clinical_db = {
    # --- Pathogenic Variants ---
    "GAGGAG": "Pathogenic",          # Cystic Fibrosis
    "CTGCTG": "Pathogenic",          # Huntington's Disease
    "GACCTG": "Pathogenic",          # Duchenne Muscular Dystrophy
    "TTGACA": "Pathogenic",          # Hemophilia A
    "CAGCAG": "Pathogenic",          # Huntington's Repeat Expansion
    "TTCGAA": "Pathogenic",          # Tay-Sachs Disease
    "AAGGGC": "Pathogenic",          # Beta-Thalassemia
    "GGCGGA": "Pathogenic",          # Fragile X Syndrome
    "CCCTAG": "Pathogenic",          # Breast Cancer BRCA1
    "TGGGAC": "Pathogenic",          # Alzheimer’s Disease

    # --- Likely Pathogenic Variants ---
    "TGCATG": "Likely Pathogenic",   # Early-onset Alzheimer's
    "AGGAGG": "Likely Pathogenic",   # Sickle Cell Carrier
    "GGATCC": "Likely Pathogenic",   # Duchenne Muscular Dystrophy
    "CTCCGG": "Likely Pathogenic",   # Marfan Syndrome
    "ACGACG": "Likely Pathogenic",   # Prostate Cancer
    "CGTTGA": "Likely Pathogenic",   # BRCA2 Mutation
    "TCTGAG": "Likely Pathogenic",   # Parkinson’s Disease
    "GGTACC": "Likely Pathogenic",   # Fragile X Carrier
    "ATCGGA": "Likely Pathogenic",   # Huntington’s Early Marker
    "CCTTGA": "Likely Pathogenic",   # Phenylketonuria (PKU)

    # --- Benign Variants ---
    "CCTGAA": "Benign",              # Common Noncoding Variant
    "TATAAA": "Benign",              # Promoter Region TATA Box
    "ATGCGT": "Benign",              # Neutral Variant in Gene Body
    "GGGCCC": "Benign",              # Microsatellite Repeat
    "AAATTT": "Benign",              # Palindromic Sequence (no effect)
    "TGCAGC": "Benign",              # Intron Variant
    "CGCGCG": "Benign",              # CpG Island (unmethylated)
    "TTTTGG": "Benign",              # Repetitive Element
    "AGAGAG": "Benign",              # Tandem Repeat
    "CTATTA": "Benign",              # 3' UTR Variant

    # --- Likely Benign Variants ---
    "AAGTCC": "Likely Benign",       # Silent Mutation
    "AAACCC": "Likely Benign",       # Conservative Substitution
    "GATTAG": "Likely Benign",       # Intergenic Variant
    "CTGAAG": "Likely Benign",       # UTR Variant
    "ATCCGA": "Likely Benign",       # Weak Splice Site Variant
    "TAGGTC": "Likely Benign",       # Transcriptional Noise
    "GTACGA": "Likely Benign",       # Low Penetrance Variant
    "TCCGAA": "Likely Benign",       # Codon Change, Same Protein
    "CGATCA": "Likely Benign",       # Low Expression Gene Region
    "TGGCAA": "Likely Benign",       # Nearby Regulatory Region

    # --- Uncertain Significance ---
    "GTTGAC": "Uncertain Significance",  # Variant of Unknown Impact
    "CGTACG": "Uncertain Significance",  # Rare Variant
    "CACGTG": "Uncertain Significance",  # Not Reported Yet
    "ATATCG": "Uncertain Significance",  # Conflicting Reports
    "TGCCTT": "Uncertain Significance",  # Novel in Database
    "AATTCC": "Uncertain Significance",  # Functional Study Pending
    "GTGGTA": "Uncertain Significance",  # Rare in Population
    "CAGTCA": "Uncertain Significance",  # Variant in Conserved Region
    "TTGGCA": "Uncertain Significance",  # Experimental Evidence Limited
    "GCACTG": "Uncertain Significance"   # Not Enough Clinical Data
}


@router.post("/")
def analyze_clinical_significance(data: DNAInput):
    sequence = data.sequence.upper()
    results = {}

    for mutation, classification in clinical_db.items():
        if mutation in sequence:
            results[mutation] = classification

    return {"matches": results}
