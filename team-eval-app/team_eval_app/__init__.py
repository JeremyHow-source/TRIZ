"""Team Member Evaluation Web App — Flask application."""

import os
from datetime import date
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


BAND_COLORS = {
    "Exceptional": "success",
    "Exceeds": "primary",
    "Meets": "warning",
    "Below": "orange",
    "Well Below": "danger",
}


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///evaluations.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "team-eval-dev-key"

    db.init_app(app)

    @app.template_filter("band_color")
    def band_color(band):
        return BAND_COLORS.get(band, "secondary")

    @app.context_processor
    def inject_today():
        return {"today": date.today().isoformat()}

    with app.app_context():
        from .routes import register_routes
        register_routes(app)
        db.create_all()

    return app
