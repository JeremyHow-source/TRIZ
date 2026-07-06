"""Database models for Team Member Evaluation."""

from . import db


class Evaluation(db.Model):
    __tablename__ = "evaluations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.String(20), nullable=False)
    candidate_name = db.Column(db.String(120), nullable=False)
    evaluator = db.Column(db.String(120), nullable=False)

    # Technical Skills (T1-T5)
    t1_domain_expertise = db.Column(db.Integer, nullable=True)
    t2_applied_technical = db.Column(db.Integer, nullable=True)
    t3_continuous_learning = db.Column(db.Integer, nullable=True)
    t4_output_quality = db.Column(db.Integer, nullable=True)
    t5_cross_functional = db.Column(db.Integer, nullable=True)

    # Problem Solving (P1-P5)
    p1_analytical_thinking = db.Column(db.Integer, nullable=True)
    p2_creative_solutions = db.Column(db.Integer, nullable=True)
    p3_decision_under_uncertainty = db.Column(db.Integer, nullable=True)
    p4_resourcefulness = db.Column(db.Integer, nullable=True)
    p5_lessons_learned = db.Column(db.Integer, nullable=True)

    # Interpersonal Skills (I1-I5)
    i1_collaborative_disposition = db.Column(db.Integer, nullable=True)
    i2_communication_clarity = db.Column(db.Integer, nullable=True)
    i3_active_listening = db.Column(db.Integer, nullable=True)
    i4_conflict_management = db.Column(db.Integer, nullable=True)
    i5_empathy_trust = db.Column(db.Integer, nullable=True)

    # Organizational Skills (O1-O5)
    o1_networking_effectiveness = db.Column(db.Integer, nullable=True)
    o2_resource_mobilisation = db.Column(db.Integer, nullable=True)
    o3_stakeholder_navigation = db.Column(db.Integer, nullable=True)
    o4_cross_unit_comms = db.Column(db.Integer, nullable=True)
    o5_strategic_alignment = db.Column(db.Integer, nullable=True)

    # Computed fields
    technical_avg = db.Column(db.Float, nullable=True)
    problem_solving_avg = db.Column(db.Float, nullable=True)
    interpersonal_avg = db.Column(db.Float, nullable=True)
    organizational_avg = db.Column(db.Float, nullable=True)
    overall_balanced_score = db.Column(db.Float, nullable=True)
    performance_band = db.Column(db.String(20), nullable=True)
    recommendation = db.Column(db.String(200), nullable=True)
    notes = db.Column(db.Text, nullable=True)

    def compute_scores(self):
        """Calculate pillar averages, overall score, and performance band."""
        tech_vals = [self.t1, self.t2, self.t3, self.t4, self.t5]
        ps_vals = [self.p1, self.p2, self.p3, self.p4, self.p5]
        ip_vals = [self.i1, self.i2, self.i3, self.i4, self.i5]
        org_vals = [self.o1, self.o2, self.o3, self.o4, self.o5]

        self.technical_avg = _safe_avg(tech_vals)
        self.problem_solving_avg = _safe_avg(ps_vals)
        self.interpersonal_avg = _safe_avg(ip_vals)
        self.organizational_avg = _safe_avg(org_vals)

        averages = [self.technical_avg, self.problem_solving_avg,
                    self.interpersonal_avg, self.organizational_avg]
        valid = [a for a in averages if a is not None]
        self.overall_balanced_score = sum(valid) / len(valid) if valid else 0

        self.performance_band = _band(self.overall_balanced_score)

    @property
    def t1(self):
        return self.t1_domain_expertise

    @property
    def t2(self):
        return self.t2_applied_technical

    @property
    def t3(self):
        return self.t3_continuous_learning

    @property
    def t4(self):
        return self.t4_output_quality

    @property
    def t5(self):
        return self.t5_cross_functional

    @property
    def p1(self):
        return self.p1_analytical_thinking

    @property
    def p2(self):
        return self.p2_creative_solutions

    @property
    def p3(self):
        return self.p3_decision_under_uncertainty

    @property
    def p4(self):
        return self.p4_resourcefulness

    @property
    def p5(self):
        return self.p5_lessons_learned

    @property
    def i1(self):
        return self.i1_collaborative_disposition

    @property
    def i2(self):
        return self.i2_communication_clarity

    @property
    def i3(self):
        return self.i3_active_listening

    @property
    def i4(self):
        return self.i4_conflict_management

    @property
    def i5(self):
        return self.i5_empathy_trust

    @property
    def o1(self):
        return self.o1_networking_effectiveness

    @property
    def o2(self):
        return self.o2_resource_mobilisation

    @property
    def o3(self):
        return self.o3_stakeholder_navigation

    @property
    def o4(self):
        return self.o4_cross_unit_comms

    @property
    def o5(self):
        return self.o5_strategic_alignment

    def to_dict(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "candidate_name": self.candidate_name,
            "evaluator": self.evaluator,
            "t1": self.t1, "t2": self.t2, "t3": self.t3, "t4": self.t4, "t5": self.t5,
            "p1": self.p1, "p2": self.p2, "p3": self.p3, "p4": self.p4, "p5": self.p5,
            "i1": self.i1, "i2": self.i2, "i3": self.i3, "i4": self.i4, "i5": self.i5,
            "o1": self.o1, "o2": self.o2, "o3": self.o3, "o4": self.o4, "o5": self.o5,
            "technical_avg": self.technical_avg,
            "problem_solving_avg": self.problem_solving_avg,
            "interpersonal_avg": self.interpersonal_avg,
            "organizational_avg": self.organizational_avg,
            "overall_balanced_score": self.overall_balanced_score,
            "performance_band": self.performance_band,
            "recommendation": self.recommendation,
            "notes": self.notes,
        }


def _safe_avg(values):
    valid = [v for v in values if v is not None]
    return round(sum(valid) / len(valid), 2) if valid else None


def _band(score):
    if score >= 4.50:
        return "Exceptional"
    elif score >= 3.50:
        return "Exceeds"
    elif score >= 2.50:
        return "Meets"
    elif score >= 1.50:
        return "Below"
    else:
        return "Well Below"
