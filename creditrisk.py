import pandas as pd
from keras import Sequential
from keras.layers import Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score
import numpy as np

data = pd.read_csv("credit_risk_dataset.csv")
home_cols = pd.get_dummies(data["person_home_ownership"])
loan_cols = pd.get_dummies(data["loan_intent"])
grade_cols = pd.get_dummies(data["loan_grade"])
data = pd.concat([data, home_cols, loan_cols, grade_cols], axis="columns")
data = data.drop(["person_home_ownership", "loan_intent", "loan_grade"], axis="columns")

data["cb_person_default_on_file"].replace(["N", "Y"], [0,1], inplace=True)

scalar = StandardScaler()

data[["person_age", "person_income", "person_emp_length", "loan_amnt", "loan_int_rate", "loan_percent_income", "cb_person_cred_hist_length"]] = scalar.fit_transform(data[["person_age", "person_income", "person_emp_length", "loan_amnt", "loan_int_rate", "loan_percent_income", "cb_person_cred_hist_length"]])

data = data.dropna()

y = data["loan_status"]
X = data.drop("loan_status", axis="columns")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True)

model = Sequential([
    Input(shape=(25,)),
    Dense(128, activation="tanh"),
    Dense(16, activation="tanh"),
    Dense(1, activation="sigmoid")
])

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["Accuracy"])


model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100)

y_pred = np.around(model.predict(X_test))
acc = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("Accuracy:", acc)
print("Confusion Matrix\n", cm)