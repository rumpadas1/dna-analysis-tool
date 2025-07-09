import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))
from app.routers import auth

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# First, create the FastAPI app
app = FastAPI()

# Then, add middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change "*" to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Now, import and include all your routers
from app.routers import (
    disease_prediction,
    clinical_significance,
    sequence_translation,
    amino_acid_properties,
    protein_solubility,
    gc_content,
    mutation_detection,
    nucleotide_distribution,
    motif_pattern_search
)

# Register routes
app.include_router(disease_prediction.router, prefix="/disease-prediction")
app.include_router(clinical_significance.router, prefix="/clinical-significance")
app.include_router(sequence_translation.router, prefix="/sequence-translation")
app.include_router(amino_acid_properties.router, prefix="/amino-acid-properties")
app.include_router(protein_solubility.router, prefix="/protein-solubility")
app.include_router(gc_content.router, prefix="/gc-content")
app.include_router(mutation_detection.router, prefix="/mutation-detection")
app.include_router(nucleotide_distribution.router, prefix="/nucleotide-distribution")
app.include_router(motif_pattern_search.router, prefix="/motif-pattern-search")
app.include_router(auth.router, prefix="/auth")

