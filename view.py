import flask

views = flask.Blueprint("views", __name__)
@views.route("/tetris")
def signup():
    return flask.render_template("tetris.html")
