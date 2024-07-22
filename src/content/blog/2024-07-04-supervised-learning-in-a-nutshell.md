---
publishedAt: 2024-07-04
title: Supervised learning in a nutshell
summary: asdasd
cover: https://images.unsplash.com/photo-1613555612473-90cf723dfb60?w=1400&h=600&fit=crop
draft: true
tags:
  - Python
  - Machine Learning
  - Supervised learning
  - scikit-learn
---

A couple of weeks ago I started venturing into Supervised Learning (yes, finally Machine Learning topics!), and I found out that the topic itself is simple to get, but hard to get good at it. Like a good old video game.

Friendly advise: the idea of this post is to give a quick overview of what supervised learning means and how you can implement it. In case you want a more deep-dive explanation I would highly recommend this book: [Introduction to Machine Learning with Python](https://www.oreilly.com/library/view/introduction-to-machine/9781449369880/), by Andreas C. Müller & Sarah Guido.

## "Supervised" Learning

Let's start by understanding what do we mean when we use the word _Supervised_ learning. Imagine you're teaching a child to identify different fruits. You show them apples, bananas, and oranges, telling them what each one is called. After seeing many examples, the child learns to recognize and name these fruits on their own. That's essentially what supervised learning does!

In supervised learning, we provide a computer algorithm with:

1. Input data (properties of fruits): called `features`
2. Correct labels for that data (the names of the fruits): called `target`

The algorithm then learns to make connections between the `features` and `target`. The main idea is that once the model is trained, it can make predictions or classifications on new, unseen data, that obviously we don't know its `target`.

## Introducing your best learning library `scikit-learn`

[Scikit-learn](https://scikit-learn.org/) is an open-source toolkit that provides simple and efficient tools for data analysis and machine learning. It offers a consistent interface for a wide range of algorithms, making it easy to implement, compare, and deploy various machine learning models.

It's also the standard when it comes to learn because it provides many helpers for most of the steps in the training of a model. It will be used a long the whole post, and I will explain what each function when the implementation of it arrives to keep engage.

To install it, run the following command in your terminal:

```bash
> pip install scikit-learn
```

## Process

Something that we **need** to train a model is **data** and when it comes to Supervised Learning, this data has to be **labeled**, which depending on the situation it can be hard ... Luckily `scikit-learn` includes many datasets that we can load and start playing around.

## Loading the

```python
# import for datasets
from sklearn.datasets import load_wine

ds = load_wine()
```

Comprehensive: Covers most machine learning tasks (classification, regression, clustering, dimensionality reduction, etc.)
Accessible: Designed for non-specialists, with a clean and intuitive API
Interoperable: Works well with NumPy and pandas, integrating smoothly into the Python scientific ecosystem
Well-documented: Extensive documentation and examples for all functionalities
Efficient: Optimized algorithms for fast computation, even on large datasets

Scikit-learn is widely used in industry and academia for rapid prototyping and production-ready machine learning applications.

In this post I'm going to be using the Wine Dataset

### Simplified Roadmap for Supervised Learning with Scikit-learn

1. **Load and Prepare the Data**

   - Import necessary libraries.
   - Load the dataset.
   - Split the data into training and testing sets.

2. **Normalize the Data**

   - Normalize the features using a scaler (e.g., `StandardScaler`).

3. **Choose a Model**

   - Select an appropriate machine learning model.

4. **Train the Model**

   - Fit the model to the training data.

5. **Make Predictions**

   - Use the trained model to make predictions on the test data.

6. **Evaluate the Model**
   - Assess the model’s performance using metrics like accuracy, classification report, and confusion matrix.

### 1. Load and Prepare the Data

**a. Import Necessary Libraries**

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

# Load the dataset
data = load_iris()
X = data.data
y = data.target
```

### 2. Handle Missing Data

```python
# Check for missing values
print(pd.DataFrame(X).isnull().sum())

# Impute missing values if necessary
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(X)
```

### 3. Split the Data into Training and Testing Sets

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### 4. Normalize the Data

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

### 5. Feature Engineering (Optional)

Create new features or transform existing ones to improve model performance.

```python
# Example: Polynomial Features
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train_scaled)
X_test_poly = poly.transform(X_test_scaled)
```

### 6. Deal with Class Imbalance (Optional)

If the dataset is imbalanced, consider using techniques such as oversampling, undersampling, or synthetic data generation.

```python
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train_scaled, y_train)
```

### 7. Choose a Model

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
```

### 8. Train the Model

```python
model.fit(X_train_res, y_train_res)
```

### 9. Cross-Validation

Use cross-validation to get a better estimate of model performance.

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X_train_res, y_train_res, cv=5, scoring='accuracy')
print(f'Cross-validation scores: {scores}')
print(f'Mean cross-validation score: {np.mean(scores)}')
```

### 10. Make Predictions

```python
y_pred = model.predict(X_test_scaled)
```

### 11. Evaluate the Model

```python
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

print(classification_report(y_test, y_pred))

print(confusion_matrix(y_test, y_pred))
```

### 12. Fine-tune the Model (Optional)

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30]
}

grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train_res, y_train_res)

print(f"Best Parameters: {grid_search.best_params_}")
print(f"Best Score: {grid_search.best_score_}")

best_model = grid_search.best_estimator_
```

### 13. Evaluate the Best Model

```python
y_pred_best = best_model.predict(X_test_scaled)

accuracy_best = accuracy_score(y_test, y_pred_best)
print(f"Accuracy of Best Model: {accuracy_best}")

print(classification_report(y_test, y_pred_best))

print(confusion_matrix(y_test, y_pred_best))
```

### 14. Save the Model

Save the trained model to a file for later use.

```python
import joblib

joblib.dump(best_model, 'best_model.pkl')
```

### 15. Load the Model (When Needed)

Load the model from the file for making predictions on new data.

```python
model = joblib.load('best_model.pkl')
```

### Summary

1. **Load and Prepare the Data**: Import libraries, load the dataset, and check for missing values.
2. **Handle Missing Data**: Impute missing values if necessary.
3. **Split the Data**: Split the dataset into training and testing sets.
4. **Normalize the Data**: Normalize the features using `StandardScaler` or another scaler.
5. **Feature Engineering** (Optional): Create or transform features to improve model performance.
6. **Deal with Class Imbalance** (Optional): Use techniques like SMOTE to handle imbalanced datasets.
7. **Choose a Model**: Select an appropriate machine learning model.
8. **Train the Model**: Fit the model to the training data.
9. **Cross-Validation**: Use cross-validation to get a better estimate of model performance.
10. **Make Predictions**: Use the trained model to make predictions on the test data.
11. **Evaluate the Model**: Assess the model’s performance using metrics like accuracy, classification report, and confusion matrix.
12. **Fine-tune the Model** (Optional): Improve model performance by tuning hyperparameters or trying different models.
13. **Save the Model**: Save the trained model for future use.
14. **Load the Model** (When Needed): Load the saved model for making predictions on new data.

These additional steps provide a more thorough and effective approach to building and deploying machine learning models using scikit-learn.
