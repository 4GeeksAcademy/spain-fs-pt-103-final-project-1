"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cat, Sponsor, PaymentRegistration
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('signup', methods= ['POST'])
def create_user():
    body = request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({'err':'Bad request'}),400
    
    search_exist = select(User).where(User.email == body['email'])
    alredy_exist = db.session.execute(search_exist).scalar_one_or_none()

    if(alredy_exist):
        return jsonify({"error": "User already exist"}),401
    

    user = User()
    user.email = body['email']
    user.password = body['password']
    user.name = body['name']
    user.lastname = body['lastname']
    user.birthdate = body['birthdate']
    db.session.add(user)
    db.session.commit()

    return jsonify({'Ok': "User created"}),201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if 'email' not in body['email'] or 'password' not in body['password']:
        return jsonify({'err':'Bad request'}),400
    
    email = body['email']
    password = body['password']
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"err": " User not exist"})
    token = create_access_token(identity=str(user.id))

    return jsonify({'token': token}),200
@api.route('user/user-data', methods=['GET'])
@jwt_required()
def user_data():
    current_user_id= get_jwt_identity()

    user = db.session.get(User,int(current_user_id))
    if user is None:
        return jsonify({"err": "User not exist"}),400
    user = user.serialize()
    return jsonify({"user":user}),200

@api.route('/user', methods= ['GET'])
def get_all_user():
    all_users = db.session.execute(select(User)).scalars().all()
    all_users = list(map(lambda user: user.serialize(), all_users))   
    
    response_body ={
        "Users" : all_users
    }

    return jsonify(response_body),201

@api. route('cat', methods = ['POST'])
def create_cat():
    body = request.get_json()

    if 'name' not in body or 'age' not in body  or  "race" not in body or  "castration" not in body or  "carcter" not in body:
        return  jsonify({'err': 'Bad request'}),400
    
    search_exist = select(Cat).where(Cat.name == body['name'])
    alredy_exist = db.session.execute(search_exist).scalar_one_or_none()

    if alredy_exist:
        return jsonify({'err', 'The cat alredy exists'}), 410
    
    cat = Cat()
    cat.name = body['name']
    cat.age = body['age']
    cat.race = body['race']
    cat.castration = body['castration']
    cat.carcter = body['carcter']
    db.session.add(cat)
    db.session.commit()

    return jsonify({'ok': 'Cat added'}),201

@api.route('/cat', methods = ['GET'])
def get_all_cat():

   all_cats = db.session.execute(select(Cat)).scalars().all()
   all_cats = list(map(lambda cat: cat.serialize(), all_cats))   
    
   response_body ={
        "Cats" : all_cats
    }

   return jsonify(response_body),201

@api.route('/cat/<int:cat_id>', methods =['GET'])
def get_cat_for_id(cat_id):
    cat = db.session.get(Cat, cat_id)
    if cat is None:
        return jsonify({'err': "Cat not found"}), 404
    response_body={
        "Cat": cat.serialize()
    }
    return jsonify(response_body),201

@api.route('/sponsor', methods = ['POST'])
def create_sponsor():
    body = request.get_json()

    if "user_id" not in body or "cat_id" not in body:
        return ({"err": 'Bad request'}),400
    
    sponsor = Sponsor()
    sponsor.user_id = body['user_id']
    sponsor.cat_id = body['cat_id']
    db.session.add(sponsor)
    db.session.commit()
    
    return jsonify({'ok': "sponsor add"}),201



@api.route('/payment-registration', methods = ['POST'])
def create_payment():
    body = request.get_json()

    if "sponsor_id" not in body or "amount" not in body or "date_payment" not in body:
        return jsonify({'err':'Bad request'}),400
    
    payment = PaymentRegistration()
    payment.sponsor_id = body['sponsor_id']
    payment.amount = body['amount']
    payment.date_payment = body['date_payment']
    db.session.add(payment)
    db.session.commit()

    return jsonify({'ok': 'Payment register'})