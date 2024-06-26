# Neural Network Powered Credit Risk Estimator
This loan default risk estimator was initially trained using Tensorflow in Python before being converted into a TensorflowJS model embedded into the webpage. The model achieves ~92% testing accuracy in predicting whether a credit requester will default on the loan.

The extra files included in the repo are:
- credit_risk_dataset.csv - The dataset used to train the model
- creditrisk.py - The Python script defining and training the neural network
- model.h5 - The fully trained model in Tensorflow format
- model.json & group1-shard1of1.bin - The fully trained model in TensorflowJS format