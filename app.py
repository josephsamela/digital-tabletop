# Import public packages
from flask import Flask, render_template, request, redirect, url_for
import flask_login

# Import application modules
from module.user import *
from module.auth import *
from module.game import *

# Create application
app = Flask(__name__)
app.secret_key = 'super secret string'  # Change this!
# Init loging manager
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

'''
Static Routes
'''
@app.route('/')
def index():
    return render_template('index.html', **locals())

'''
Login Routes
'''
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return '''
               <h2>Login</h2>
               <form action='login' method='POST'>
                <input type='text' name='email' id='email' placeholder='email'/>
                <input type='password' name='password' id='password' placeholder='password'/>
                <input type='submit' name='submit' value='Login'/>
               </form>
               '''

    email = request.form['email']
    password = request.form['password']
    user_id = auth().verify_credentials(email, password)
    if user_id is not False:
        flask_login.login_user(User(user_id))
        return redirect(url_for('home'))
    else:
        return 'bad credentials - cannot login'

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return '''
               <h2>Register</h2>
               <form action='register' method='POST'>
                <input type='text' name='email' id='email' placeholder='email'/>
                <input type='password' name='password' id='password' placeholder='password'/>
                <input type='submit' name='submit' value='Register'/>
               </form>
               '''
    email = request.form['email']
    password = request.form['password']
    user_id = db_create_user(email, password)
    if user_id is not False:
        flask_login.login_user(User(user_id))
        return redirect(url_for('home'))
    else:
        return 'bad credentials - cannot register'

@app.route("/logout")
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return redirect('/')

@login_manager.user_loader
def user_loader(email):
    # Check if user exists
    user_id = db_verify_email(email)
    if user_id is not False:
        return User(user_id)
    else:
        return

@login_manager.request_loader
def request_loader(request):
    # Check if user exists
    email = request.form.get('email')
    user_id = db_verify_email(email)
    if user_id is not False:
        return User(user_id)
    else:
        return

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'

if __name__ == '__main__':
    app.run(debug=True, port=8000)
