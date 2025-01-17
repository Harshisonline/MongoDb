# MongoDB Practice Repository
## Using Zod for Schema Validation

Zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your data and validate them easily. This can be particularly useful when working with MongoDB to ensure that the data being stored in your database adheres to a specific structure.

### Installation

To install Zod, you can use npm or yarn:

```bash
npm install zod
# or
yarn add zod
```

### Example Usage

Here is an example of how to use Zod to define and validate a schema:

```typescript
import { z } from 'zod';

// Define a schema for a user
const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().int().positive(),
});

// Example data
const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
};

// Validate the data
try {
    userSchema.parse(userData);
    console.log("Validation successful!");
} catch (e) {
    console.error("Validation failed:", e.errors);
}
```

In this example, we define a schema for a user object with `name`, `email`, and `age` fields. We then validate an example user data object against this schema. If the data is valid, a success message is logged; otherwise, the validation errors are logged.

Using Zod can help you catch errors early and ensure that your data is always in the expected format.

Welcome to the MongoDB Practice Repository! This repository contains various exercises and examples to help you practice and improve your MongoDB skills.

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Exercises](#exercises)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This repository is designed to provide hands-on practice with MongoDB, a popular NoSQL database. Whether you are a beginner or an experienced developer, you will find useful exercises and examples to enhance your understanding of MongoDB.

## Setup

To get started, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/mongodb-practice.git
    ```
2. Navigate to the project directory:
    ```bash
    cd mongodb-practice
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```

## Exercises

The repository is organized into different folders, each containing exercises and examples on various MongoDB topics. Here are some of the topics covered:

- Basic CRUD operations
- Indexing
- Aggregation
- Schema design
- Transactions

Each folder contains a README file with instructions and explanations for the exercises.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request. Make sure to follow the contribution guidelines.
