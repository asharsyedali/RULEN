/**
 * RULEN Platform - Presentation Mock Data & Course Content
 * Department of Artificial Intelligence, UMT Lahore
 */

export interface CLOMapping {
  id: string;
  code: string;
  outcome: string;
  level: string;
  plo: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "short" | "long";
  section: "A" | "B" | "C";
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  marks?: number;
  clo?: string;
}

// 1. CLO/PLO Alignment List for Department of AI - CS301 Data Structures
export const CLO_LIST: CLOMapping[] = [
  {
    id: "clo1",
    code: "CLO 1",
    outcome: "Implement stack and queue data structures using arrays and linked lists.",
    level: "Apply (C3)",
    plo: "PLO 2"
  },
  {
    id: "clo2",
    code: "CLO 2",
    outcome: "Analyze time complexity of searching and sorting algorithms using Big-O notation.",
    level: "Analyze (C4)",
    plo: "PLO 3"
  },
  {
    id: "clo3",
    code: "CLO 3",
    outcome: "Apply tree traversal algorithms (inorder, preorder, postorder) to solve hierarchical problems.",
    level: "Apply (C3)",
    plo: "PLO 2"
  },
  {
    id: "clo4",
    code: "CLO 4",
    outcome: "Design and implement graph algorithms including BFS and DFS for real-world traversals.",
    level: "Create (C6)",
    plo: "PLO 5"
  }
];

export const PLO_INFO = {
  "PLO 2": "Problem Analysis — Identify, formulate, and analyze complex engineering and computing problems.",
  "PLO 3": "Design/Development of Solutions — Design solutions for complex computing problems with system specifications.",
  "PLO 5": "Modern Tool Usage — Apply appropriate techniques, resources, and modern IT and software engineering tools."
};

// 2. Student Section: Python OOP Notes in Roman Urdu
export const ROMAN_URDU_NOTES = `
-----------------------------------------------------------
RULEN - REAL-TIME UNIFIED LECTURE EXTRACTION NETWORK
Python OOP — Lecture Notes (Roman Urdu)
-----------------------------------------------------------

1. Introduction to OOP (Object Oriented Programming)
Object-Oriented Programming (OOP) ek aisi methodology hai jismein hum programming logic ko 'Objects' ke gird structure karte hain. Yeh code ko zyada safra, organized, aur reusable banata hai, bilkul real-world objects ki tarah.

Key Terminology:
- Code Reusability: Ek baar likha hua code baar-baar doosri jagah bager naye siray se likhay istemaal karna.
- Modularity: Apne system ko chote chote hisson (classes) mein taqseem karna.

2. Class aur Object kya hai?
* Blueprint vs Reality:
- Class ek structural blueprint ya darcha hoti hai. Yeh batati hai ke object ke paas kaunsa data (attributes) aur kaunse actions (methods) honge.
- Object us class ka actual physical instance ya aslool hota hai. Jab hum blueprint se koi real cheez functional banate hain, use object kehte hain.

* Real-World Misal:
- Car class: Car ka design blueprint hai jis mein bataya gaya hai ke iski speed, color aur model hoga.
- Aapki Gaari (Civic, Corolla): Yeh aslool Objects hain jo actually exist karte hain aur road par chalti hain.

* Python Syntax Example:
class Car:
    def __init__(self, brand, speed):
        self.brand = brand     # Attribute
        self.speed = speed     # Attribute

my_car = Car("Toyota", 180)    # Object creation

3. Inheritance (Ja-Nashi)
Inheritance ek aisi capability hai jiske zariye ek nayi class (Child Class) kisi pehle se maujood class (Parent Class) ki tamam properties aur methods ko automatically adopt kar sakti hai.

* Fayda:
- Code duplication ko khatam karta hai.
- Agar standard functionalities Parent mein likh di jayein, toh Child mein likhne ki zaroorat nahi rehti.

* Misal:
ElectricCar class, Car class se inherit karegi kyunki ElectricCar bhi car hi hai, bas is mein extra battery status hota hai.
`;

// 3. Student Section: Python OOP Notes in English
export const ENGLISH_NOTES = `
-----------------------------------------------------------
RULEN - REAL-TIME UNIFIED LECTURE EXTRACTION NETWORK
Python OOP — Lecture Notes (English Edition)
-----------------------------------------------------------

1. Introduction to Object-Oriented Programming (OOP)
Object-Oriented Programming is a software design paradigm that structures code around data, or "objects," rather than logic and functions. 

Core Philosophy:
- Model physical, real-world systems as software entities.
- Enhance clean component design, code maintenance, and long-term expandability.

2. Classes and Objects in Detail
* Definition:
- A Class is a logical template or blueprint outlining the properties (data variables) and behaviors (functions) that instances of this class will exhibit.
- An Object is a physical instantiation of that blueprint. Memory is allocated only when objects are instantiated.

* Python implementation:
class Car:
    def __init__(self, brand: str, Speed: int):
        self.brand = brand # Attribute
        self.speed = speed # Attribute
        
    def announce(self):
        return f"This is a {self.brand} running at {self.speed} km/h."

3. The Four Pillars of OOP
* Encapsulation:
- Bundling data (state) and methods (behavior) within a single unit (class).
- Restricting direct external access to object internals using private markers (double underscore, e.g., __balance).

* Inheritance:
- Allowing child classes to acquire methods and state attributes from a base superclass.
- Enables multi-level architectures without repeating core algorithms.

* Polymorphism:
- The ability of different classes to respond uniquely to the exact same method signature.
- Demonstrated through Method Overriding (rewriting a parent method inside the child).

* Abstraction:
- Hiding underlying implementation and logical complexities, only showcasing essential operations.
- Achieved using abstract classes via Python's 'abc' library.
`;

// 4. Student Quiz Dataset (15 Questions Mixed Format)
export const PRACTICE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    type: "mcq",
    section: "A",
    question: "Which of the following best describes a class in Python?",
    options: [
      "A built-in system loop instruction",
      "A blueprint or logical template for creating objects",
      "An array of pre-allocated raw integers",
      "A module import compiler header"
    ],
    correctIndex: 1,
    explanation: "A class acts as a blueprint or template that defines the structure and behaviors of instances (objects) created from it."
  },
  {
    id: "q2",
    type: "mcq",
    section: "A",
    question: "What does the '__init__' method do in a Python class?",
    options: [
      "Deletes an object and releases system memory",
      "Declares the global security scope of the module",
      "Initializes object attributes immediately when an instance is instantiated",
      "Loads external shared C-libraries"
    ],
    correctIndex: 2,
    explanation: "The '__init__' method is Python's constructor, which sets attributes and operates on creation of an instance."
  },
  {
    id: "q3",
    type: "mcq",
    section: "A",
    question: "Which OOP concept allows a subclass to inherit methods and properties of its parent class?",
    options: [
      "Encapsulation and Scoping",
      "Inheritance",
      "Abstraction and Interfaces",
      "Overloading"
    ],
    correctIndex: 1,
    explanation: "Inheritance enables a child class to gain access to the public and protected attributes and methods of its parent."
  },
  {
    id: "q4",
    type: "mcq",
    section: "A",
    question: "What is Method Overriding in Python?",
    options: [
      "Calling a method inside a nested loop multiple times",
      "Redefining a parent class method inside a subclass to change its behavior",
      "Deleting a class definition dynamically at runtime",
      "Using import alias keyword to overwrite namespaces"
    ],
    correctIndex: 1,
    explanation: "Overriding happens when a subclass provides a specific implementation for a method already declared in its parent class."
  },
  {
    id: "q5",
    type: "mcq",
    section: "A",
    question: "Which keyword is used to call a parent class constructor or method from within a child class?",
    options: [
      "parent()",
      "base_class()",
      "super()",
      "this_parent()"
    ],
    correctIndex: 2,
    explanation: "'super()' allows referencing and calling attributes or constructors of the parent/superclass directly."
  },
  {
    id: "q6",
    type: "mcq",
    section: "A",
    question: "Which of the following represents private attribute syntax in Python?",
    options: [
      "private.attribute",
      "__attribute",
      "attribute_private",
      "@private attribute"
    ],
    correctIndex: 1,
    explanation: "Python enforces private accessibility (name mangling) by prefixing variables/methods with double underscores (e.g., __secret)."
  },
  {
    id: "q7",
    type: "short",
    section: "B",
    question: "Define encapsulation and provide one simple real-world analogy. (3 Marks)",
    explanation: "Encapsulation is bundling data and the methods that operate on that data inside a class, while restricting direct access. Real-world analogy: A medical capsule - the healing ingredients are protected inside, accessible only when taken."
  },
  {
    id: "q8",
    type: "short",
    section: "B",
    question: "Write a short Python class 'Rectangle' with attributes length and width and a method 'area()' that returns the calculated area. (4 Marks)",
    explanation: "Sample Python structure: \nclass Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n    def area(self):\n        return self.length * self.width"
  },
  {
    id: "q9",
    type: "short",
    section: "B",
    question: "Explain the logical difference between the '__str__' and '__repr__' methods in a Python class. (3 Marks)",
    explanation: "'__str__' is meant to compute a readable, user-friendly string representation of an object. '__repr__' is for an unambiguous, developer-focused representation often used for debugging."
  },
  {
    id: "q10",
    type: "long",
    section: "C",
    question: "Explain all four pillars of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction) with Python code sketches for each. Discuss how they contribute to writing scalable, clean code for Enterprise AI systems. (5 Marks)",
    explanation: "The architecture benefits from separation of concerns, DRY code (Don't Repeat Yourself), structural security boundaries (encapsulation), adaptive behavior (polymorphism), and clean application interfaces (abstraction)."
  }
];

// 5. Teacher Section: Generated Midterm Exam Paper Structure
export const SIMULATED_MIDTERM_EXAM = `
=============================================================================
             UNIVERSITY OF MANAGEMENT AND TECHNOLOGY (UMT), LAHORE
                     Department of Artificial Intelligence
=============================================================================
CS301 — Data Structures and Algorithms
Midterm Examination — Fall 2024
Total Marks: 50 | Time Allowed: 2 Hours
=============================================================================
General Instructions:
- All questions are compulsory.
- Handwriting must be legible. Clearly label each section on your answer sheet.
- Show working traces where appropriate.

SECTION A — MULTIPLE CHOICE QUESTIONS [10 MARKS]
Choose the single correct option. Each question carries 1 Mark. [CLO 1, CLO 2]

Q1. Which data structure operates strictly on the LIFO (Last In First Out) principle?
    (A) Queue     (B) Stack     (C) Linked List     (D) AVL Tree
    [Correct: B]

Q2. What is the average time complexity of performing binary search on a sorted list?
    (A) O(n)       (B) O(log n)  (C) O(n^2)          (D) O(1)
    [Correct: B]

Q3. In a standard Queue data structure, insertion is done at the ____, and deletion at the ____.
    (A) Front, Rear  (B) Rear, Front  (C) Top, Bottom  (D) Left, Right
    [Correct: B]

Q4. Which binary tree traversal visits the root node first, followed by left subtree and right subtree?
    (A) Preorder   (B) Inorder   (C) Postorder       (D) Level-order
    [Correct: A]

Q5. What internal helper data structure is used to implement Breadth-First Search (BFS) in graphs?
    (A) Stack     (B) Queue     (C) Binary Heap     (D) Hash Table
    [Correct: B]

(Questions 6 to 10 follow the above design system layout...)


SECTION B — SHORT ANSWER QUESTIONS [20 MARKS]
Answer all questions. Each question carries 5 Marks.

Q11. [CLO 1] Design and implement a Stack class in Python containing push(), pop(), and peek() operations. Provide a sample code trace showing how this Stack can be utilized to reverse an arbitrary string.

Q12. [CLO 2] Formulate an exhaustive theoretical comparison between Bubble Sort and Merge Sort. State their official best-case, average-case, and worst-case time complexities using Big-O notation, with structural justifications of operations involved.

Q13. [CLO 3] Given a binary tree with structural values [5, 3, 8, 1, 4, 7, 9] (inserted as BST):
     (i) Sketch the resulting tree.
     (ii) Perform inorder, preorder, and postorder traversals, listing the exact sequential output arrays.

Q14. [CLO 4] Contrast Breadth-First Search (BFS) and Depth-First Search (DFS). Outline one scenario in automated pathfinding navigation where BFS is objectively superior to DFS.


SECTION C — LONG ANSWER QUESTIONS [20 MARKS]
Answer all parts. Each question carries 10 Marks.

Q15. [CLO 1, CLO 2] (10 Marks)
     Design and implement a complete double-ended queue (Dequeue) or array-based Queue logic in Python. Include full handlers for checking Underflow and Overflow bound errors, alongside helper functions size() and isEmpty(). Write a comparative assay contrasting your queue's space-time efficiency against Python's native list structures.

Q16. [CLO 3, CLO 4] (10 Marks)
     Write Python classes supporting a Binary Search Tree (BST) containing recursive routines for node insert, element lookup, and minimum-element search. Implement this to sort the numeric sequence: [45, 12, 78, 23, 56, 9, 34]. Identify and discuss the degradation of lookup efficiency to O(n) in unbalanced BST structures, and suggest a self-balancing solution.

-------------------- End of Examination Paper - Good Luck! ------------------
`;

// Helper for generating dynamic files to let users download real things!
export const formatFileContents = (title: string, bodyText: string) => {
  return `=============================================================================
RULEN - Real-Time Unified Lecture Extraction Network
Academic Project Demonstration Tool
Supervised by Dept of AI, UMT Lahore
-----------------------------------------------------------------------------
Title: ${title}
Generated On: Monday, June 1, 2026
=============================================================================\n\n` + bodyText;
};
