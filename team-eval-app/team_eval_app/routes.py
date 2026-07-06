"""Flask routes for Team Member Evaluation Web App."""

from datetime import datetime
from flask import render_template, request, redirect, url_for, jsonify, flash
from . import db
from .models import Evaluation


def register_routes(app):
    """Register all routes with the Flask app."""

    @app.route("/")
    def index():
        evaluations = Evaluation.query.order_by(Evaluation.id.desc()).all()
        return render_template("index.html", evaluations=evaluations)

    @app.route("/questionnaire", methods=["GET", "POST"])
    def questionnaire():
        if request.method == "POST":
            ev = Evaluation(
                timestamp=datetime.now().strftime("%Y-%m-%d %H:%M"),
                candidate_name=request.form.get("candidate_name", ""),
                evaluator=request.form.get("evaluator", ""),
                t1_domain_expertise=_int(request, "t1"),
                t2_applied_technical=_int(request, "t2"),
                t3_continuous_learning=_int(request, "t3"),
                t4_output_quality=_int(request, "t4"),
                t5_cross_functional=_int(request, "t5"),
                p1_analytical_thinking=_int(request, "p1"),
                p2_creative_solutions=_int(request, "p2"),
                p3_decision_under_uncertainty=_int(request, "p3"),
                p4_resourcefulness=_int(request, "p4"),
                p5_lessons_learned=_int(request, "p5"),
                i1_collaborative_disposition=_int(request, "i1"),
                i2_communication_clarity=_int(request, "i2"),
                i3_active_listening=_int(request, "i3"),
                i4_conflict_management=_int(request, "i4"),
                i5_empathy_trust=_int(request, "i5"),
                o1_networking_effectiveness=_int(request, "o1"),
                o2_resource_mobilisation=_int(request, "o2"),
                o3_stakeholder_navigation=_int(request, "o3"),
                o4_cross_unit_comms=_int(request, "o4"),
                o5_strategic_alignment=_int(request, "o5"),
                recommendation=request.form.get("recommendation", ""),
                notes=request.form.get("notes", ""),
            )
            ev.compute_scores()
            db.session.add(ev)
            db.session.commit()
            flash(f"Evaluation for {ev.candidate_name} saved successfully!")
            return redirect(url_for("matrix", eval_id=ev.id))

        return render_template("questionnaire.html")

    @app.route("/matrix/<int:eval_id>")
    def matrix(eval_id):
        ev = Evaluation.query.get_or_404(eval_id)
        return render_template("matrix.html", evaluation=ev)

    @app.route("/database")
    def database():
        search = request.args.get("search", "")
        band = request.args.get("band", "")
        query = Evaluation.query
        if search:
            query = query.filter(Evaluation.candidate_name.ilike(f"%{search}%"))
        if band:
            query = query.filter(Evaluation.performance_band == band)
        evaluations = query.order_by(Evaluation.id.desc()).all()
        return render_template("database.html", evaluations=evaluations, search=search, band=band)

    @app.route("/radar/<int:eval_id>")
    def radar(eval_id):
        ev = Evaluation.query.get_or_404(eval_id)
        return render_template("radar.html", evaluation=ev)

    @app.route("/heatmap")
    def heatmap():
        evaluations = Evaluation.query.order_by(Evaluation.id.desc()).all()
        return render_template("heatmap.html", evaluations=evaluations)

    @app.route("/api/evaluations")
    def api_evaluations():
        evaluations = Evaluation.query.order_by(Evaluation.id.desc()).all()
        return jsonify([ev.to_dict() for ev in evaluations])

    @app.route("/api/evaluation/<int:eval_id>")
    def api_evaluation(eval_id):
        ev = Evaluation.query.get_or_404(eval_id)
        return jsonify(ev.to_dict())

    @app.route("/export/csv")
    def export_csv():
        evaluations = Evaluation.query.order_by(Evaluation.id.asc()).all()
        import io
        output = io.StringIO()
        headers = [
            "EntryID", "Timestamp", "CandidateName", "Evaluator",
            "T1_DomainExpertise", "T2_AppliedTechnical", "T3_ContinuousLearning",
            "T4_OutputQuality", "T5_CrossFunctional",
            "P1_AnalyticalThinking", "P2_CreativeSolutions", "P3_DecisionUnderUncertainty",
            "P4_Resourcefulness", "P5_LessonsLearned",
            "I1_CollaborativeDisposition", "I2_CommunicationClarity", "I3_ActiveListening",
            "I4_ConflictManagement", "I5_EmpathyTrust",
            "O1_NetworkingEffectiveness", "O2_ResourceMobilisation", "O3_StakeholderNavigation",
            "O4_CrossUnitComms", "O5_StrategicAlignment",
            "Technical_Avg", "ProblemSolving_Avg", "Interpersonal_Avg", "Organizational_Avg",
            "OverallBalancedScore", "PerformanceBand", "Recommendation"
        ]
        output.write(",".join(headers) + "\n")
        for ev in evaluations:
            row = [
                ev.id, ev.timestamp, ev.candidate_name, ev.evaluator,
                ev.t1, ev.t2, ev.t3, ev.t4, ev.t5,
                ev.p1, ev.p2, ev.p3, ev.p4, ev.p5,
                ev.i1, ev.i2, ev.i3, ev.i4, ev.i5,
                ev.o1, ev.o2, ev.o3, ev.o4, ev.o5,
                ev.technical_avg, ev.problem_solving_avg, ev.interpersonal_avg, ev.organizational_avg,
                ev.overall_balanced_score, ev.performance_band, ev.recommendation,
            ]
            output.write(",".join([str(v) if v is not None else "" for v in row]) + "\n")
        from flask import Response
        return Response(
            output.getvalue(),
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment; filename=member_database.csv"}
        )

    @app.route("/delete/<int:eval_id>", methods=["POST"])
    def delete(eval_id):
        ev = Evaluation.query.get_or_404(eval_id)
        db.session.delete(ev)
        db.session.commit()
        flash(f"Evaluation for {ev.candidate_name} deleted.")
        return redirect(url_for("database"))


def _int(request, field_name):
    val = request.form.get(field_name)
    return int(val) if val else None
