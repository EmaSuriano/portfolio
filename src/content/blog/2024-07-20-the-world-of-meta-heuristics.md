---
title: The world of Meta heuristics
publishedAt: 2024-07-20
summary: I explained how you can easily convert your notebooks into well animated presentations powered by Reveal.js
draft: true
cover: https://images.unsplash.com/photo-1577401239170-897942555fb3?w=1400&h=600&fit=crop
tags:
  - Programming
  - Heuristics
  - Meta heuristics
---

For the past month I've been working quite extensively with the topic of Heuristics or meta heuristics (both are fine to say) in the topic of Algorithm Optimization, and even after developing several implementation I still cannot believe this topic is not spread or talked enough.

When I was studying Computer Engineering back on College, I remembering having classes that were around all these topics, but with a more theoretical focus. So for example in case would come up and talk about genetic algorithm, the only thing I was able to contribute was that there was an initial population, and over the time moves forward the individuals of the population would have evolved. Now if you would have asked me, how they will evolve or into what, I would have no clue at all ...

After having a more in hands experience, I can finally _"close the gap"_ between what I thought it was merely technical and how it can be possibly get implemented. In the case of the genetic algorithm, the population goes through the process of `crossing`, `mutation` and later `selection`, which are basically functions with an input and returning value.

## Usage of Heuristics

The idea of Meta heuristics itself is **fantastic** and in case you didn't know the first heuristic algorithm was published around 1990, so it's not a new topic inside Computer Science ...

The main issue people tend not to learn about them is because because in most of the situation we don't actually need to use thm. Here we need to talk about a bit the P and NP problems:

- P problems are the ones that can be solved in polynomial times (most of the algorithm that we deal with)
- NP problems which are the ones that cannot be solved in polynomial.

> The word "solved" refers to finding the optimal solution to the algorithm.

This is why in most of the business applications that we work on (except you are working in a very specific project that involves high degree of computation), we don't have to use heuristics.

Some good examples of NP problems are:

- Sales Travelling Problem (STP): given a list of cities inter-connected with a value of `d` distance, find the order to visit all the cities with the minimum distance.
- K-Rucksack Problem: given a list of object with a price and a weight and a rucksack with a max capacity, find the list of items to fit inside the bag in order to obtain the best value in terms of money.

All these problems at first glance might seem possible to accomplish with a set of loops and conditions, but as soon as we start having more and more possibilities to consider (more cities/items) it's not possible to find a solution in a reasonable time, and here is where Heuristics come to save the day!

## What are they and how to define them?

An heuristic is an iterative process that can be applied to **any problem** and have to also **configure** to it as well. They can be divided into different groups depending on the strategy they follow: TODO --> add categories here!

Regardless of the strategy they all share the following:

- A way to represent the solution using any data structure: string, list, object, tree, etc.
- A function that can interpret how good your solution is, normally called _objective function_.

In the case of the STP, they will be:

- Solution representation: a list with the cities in the order to follow.
- Objective function: accumulate the distance between the neighbor cities and also add the last one with the first (so it counts as coming back to the start).

Depending on the heuristic you pick, they will require other parameters or functions to define, which I'm not going to cover because it's not the goal of this post.

## How they work?

As I mentioned above, they are iterative process normally of one or two nested loops (which is why they are recommended when the amount of data large), and in each they will try to improve (or not --> more on this later in this section) the solution to return.

For this

They can be as simple as generating random solution for `n` iterations and keeping the best one of all the loops. This heuristic received the name of _Random Search_ and it can be easily implemented in python like this:

```

```
