from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship
from sqlalchemy import DateTime
from datetime import datetime
from typing import List

db = SQLAlchemy()

class Sponsor(db.Model):
    id:Mapped[int ] = mapped_column(primary_key= True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    cat_id: Mapped[int] = mapped_column(ForeignKey("cat.id"))

    user_sponsor : Mapped["User"] = relationship(back_populates="sponsor")
    cat :Mapped["Cat"] = relationship(back_populates="sponsor_cat")
    payments :Mapped[List["PaymentRegistration"]]= relationship(back_populates="sponsor")

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "cat_id":self.cat_id
        }
class PaymentRegistration(db.Model):
    id:Mapped[int ] = mapped_column(primary_key= True)
    sponsor_id:Mapped[int] = mapped_column(ForeignKey("sponsor.id"))
    amount: Mapped[int] = mapped_column(nullable=False)
    date_payment: Mapped[datetime] = mapped_column(DateTime, nullable= False)

    sponsor : Mapped["Sponsor"] = relationship(back_populates="payments")

    def serialize(self):
        return{
            "id":self.id,
            "sponsor_id": self.sponsor_id,
            "amount" : self.amount,
            "date_payment": self.date_payment
        }
    def serialize_with_sponsor(self):
        return {
         'id': self.id,
            'amount': self.amount,
            'date_payment': str(self.date_payment),
            'sponsor': {
             'id': self.sponsor.id,
             'cat_id': self.sponsor.cat_id,
             'user_id': self.sponsor.user_id
        }
    }
       

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(120),nullable=False)
    lastname: Mapped[str] = mapped_column (String(120), nullable = False)
    birthdate: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    sponsor: Mapped[List["Sponsor"]] = relationship(back_populates="user_sponsor")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "birthdate": self.birthdate
            # do not serialize the password, its a security breach
        }
    
class Cat(db.Model):
    id :Mapped[int ] = mapped_column(primary_key= True)
    name: Mapped[str] = mapped_column(String(120),nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    race: Mapped[str] = mapped_column (String(120),nullable= False)
    castration: Mapped[bool] = mapped_column(nullable=False)
    character:Mapped[str] = mapped_column (String(120),nullable= False)

    sponsor_cat: Mapped[List["Sponsor"]] = relationship(back_populates="cat")

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "race":self.race,
            "castration": self.castration,
            "character": self.character
        }

    
