---
title: "How to Install Fuzzy CLIPS: A Quick and Easy Setup Tutorial"
publishedAt: 2024-07-31
summary: How to set up and use Fuzzy CLIPS to create a fuzzy logic system for controlling fan speed based on temperature and humidity.
cover: https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?w=1400&h=600&fit=crop
tags:
  - CLIPS
  - Fuzzy CLIPS
  - Fuzzy
---

Fuzzy CLIPS is an extension of [CLIPS](https://www.clipsrules.net/) (C Language Integrated Production System) designed for handling fuzzy logic. It allows systems to make decisions based on approximate or imprecise information.

Fuzzy CLIPS is an older tool with limited and outdated online documentation. This is the main reason I'm writing this short post.

## Why Fuzzy Logic?

Fuzzy logic excels at handling real-world complexity and imprecision, it allows you to model human-like reasoning, deal with ambiguous data, and create more intuitive control systems. By using degrees of truth instead of binary (`true`/`false`) decisions, fuzzy logic can provide smoother, more accurate results in situations where traditional logic falls short

It's precious in fields like control engineering, decision support systems, and AI, which can lead to more robust and flexible solutions that better mimic human decision-making processes.

## Installing Fuzzy CLIPS

The source code can be found in [GitHub](https://github.com/rorchard/FuzzyCLIPS) but as expected, this cannot be directly executed in our system. We need to compile the program to run it locally.

Let's start by cloning the repository:

```bash
$ git clone https://github.com/rorchard/FuzzyCLIPS && cd FuzzyCLIPS/source
```

Now we are going to make use of the `make` command which is available by default in OSX and Linux. In case you are running Windows, please check to install using `choco` ([reference](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows)).

```bash
$ make fzclips
```

This should create an executable binary called `fzclips` which we can execute:

```bash
$ ./fz_clips

FuzzyCLIPS V6.10d (10/22/2004)
FuzzyCLIPS>
```

## Fuzzy Concepts

To understand how Fuzzy Clips works, is better to do a small recap of some of the core concepts of Fuzzy Logic.

**Fuzzy sets**: extend classical set theory by allowing partial membership. In a classical set, an element either belongs to the set (1) or doesn't (0). In a fuzzy set, an element can have any value between 0 and 1, indicating its degree of membership.

- Example: In a fuzzy set for "tall people," someone who is 5'10" might have a membership degree of 0.7, while someone who is 6'2" might have a membership degree of 0.9.

**Linguistic variables**: These are variables whose values are words or sentences rather than numbers. They allow us to express complex concepts in natural language terms.

- Example: Temperature could be a linguistic variable with values like "cold," "cool," "warm," and "hot."

**Fuzzy rules**: These are conditional statements that use linguistic variables, typically in an IF-THEN format. They form the basis of fuzzy reasoning.

- Example: "IF temperature is hot AND humidity is high THEN comfort is low"

**Fuzzification**: This is the process of converting crisp (precise) input values into fuzzy values. It involves determining the degree to which these inputs belong to each of the appropriate fuzzy sets.

- Example: Converting a precise temperature of 28°C into fuzzy values like "0.7 warm" and "0.3 hot"

**Inference**: This step applies the fuzzy rules to the fuzzified inputs to determine the fuzzy output. It involves evaluating all rules in parallel and combining their results.

- Example: Applying multiple rules about temperature, humidity, and wind to determine the overall comfort level

**Defuzzification**: This is the final step where the fuzzy output is converted back into a crisp (precise) value. There are several methods for this, such as the centroid method or mean of maximum.

- Example: Converting a fuzzy comfort level (e.g., "0.6 uncomfortable") into a specific value on a scale of 1-10

## Demo time: Fan Control System

Let's create a fuzzy logic system to control a fan based on temperature and humidity. The system will adjust the fan speed (low, medium, high) depending on the fuzzy input values for temperature and humidity.

Create a new file with the extension `.clp` and open it with any code editor that you want.

### 1. Definition of Membership functions

```clojure
(deftemplate Temperature
  0 40
  ((cold (0 1) (10 0))
   (warm (5 0) (20 1) (30 0))
   (hot (25 0) (40 1) (40 1))))

(deftemplate Humidity
  0 100
  ((low (0 1) (20 0))
   (medium (10 0) (50 1) (90 0))
   (high (70 0) (100 1) (100 1))))
```

Here, `Temperature` and `Humidity` are the fuzzy variables with membership functions `cold`, `warm`, `hot`, `low`, `medium`, and `high`. These are going to be our entry points for the system.

```clojure
(deftemplate FanSpeed
  0 100
  ((slow (0 1) (30 0))
   (medium (20 0) (50 1) (80 0))
   (fast (60 0) (100 1) (100 1))))
```

Lastly let's add the `FanSpeed` with `slow`, `medium`, and `fast` functions, which are going to get activated based on the rules of the system.

### 2. Definition of rules

Create rules to determine the fan speed based on temperature and humidity:

```clojure
(defrule cool-fan
  (Temperature cold)
  (Humidity low)
 =>
  (assert (FanSpeed slow)))

(defrule moderate-fan
  (Temperature warm)
  (Humidity medium)
 =>
  (assert (FanSpeed medium)))

(defrule hot-humid-fan
  (Temperature hot)
  (Humidity high)
 =>
  (assert (FanSpeed fast)))
```

These rules set the fan speed to `slow`, `medium`, or `fast` based on the combination of temperature and humidity.

### 3. Definition of Facts

Provide sample data for temperature and humidity:

```clojure
;; Sample facts for temperature and humidity
(deffacts sample-facts
  (Temperature (25 0) (25 1) (25 0))
  (Humidity (40 0) (40 1) (40 0)))
```

These facts represent a temperature of 25°C and a humidity of 40%.

### 4. Running the system

Open a new terminal in your system and execute the program `fz_clips` - the one that we compiled in the beginning. Once running, we need to load our program into the library. For this, we need to use the `load` function and send the path of the file containing the rules we defined previously:

```bash
FuzzyCLIPS> (load ./demo.clp)
Defining deftemplate: Temperature
Defining deftemplate: Humidity
Defining deftemplate: FanSpeed
Defining defrule: cool-fan +j+j
Defining defrule: moderate-fan +j+j
Defining defrule: hot-humid-fan +j+j
Defining deffacts: sample-facts
TRUE
```

Now we need to initialize the environment, to load all the facts and rules into the memory:

```bash
FuzzyCLIPS> (reset)
```

We can double-check if everything was loaded correctly with:

```bash
FuzzyCLIPS> (facts)
f-0 (initial-fact) CF 1.00
f-1 (Temperature ???) CF 1.00
        ( (25.0 0.0) (25.0 1.0) (25.0 0.0)  )

f-2 (Humidity ???) CF 1.00
        ( (40.0 0.0) (40.0 1.0) (40.0 0.0)  )

For a total of 3 facts.
```

```bash
FuzzyCLIPS> (rules)
cool-fan
moderate-fan
hot-humid-fan
For a total of 3 defrules.
```

Now it's time to execute the rules based on the asserted facts.

```bash
FuzzyCLIPS> (run)
```

Alternatively, we can make partial execution by specifying the number of steps, for example, rule by rule:

```bash
FuzzyCLIPS> (run 1)
```

At any point, we always check our facts to see the status of our system.

```bash
FuzzyCLIPS> (facts)
f-0 (initial-fact) CF 1.00
f-1 (Temperature ???) CF 1.00
        ( (25.0 0.0) (25.0 1.0) (25.0 0.0)  )

f-2 (Humidity ???) CF 1.00
        ( (40.0 0.0) (40.0 1.0) (40.0 0.0)  )

f-3 (FanSpeed ???) CF 1.00
        ( (20.0 0.0) (35.0 0.5) (65.0 0.5) (80.0 0.0)  )

For a total of 4 facts.
```

As we can see the fact of `FanSpeed` has been loaded and some values set. Fuzzy clips provides a way to **visualize** it in the terminal by using the function `plot-fuzzy-value`:

```bash
FuzzyCLIPS> (plot-fuzzy-value t + 0 100 3)

Fuzzy Value: FanSpeed
Linguistic Value: ??? (+)

 1.00
 0.95
 0.90
 0.85
 0.80
 0.75
 0.70
 0.65
 0.60
 0.55
 0.50                  +++++++++++++++
 0.45                 +               +
 0.40                +                 +
 0.35               +                   +
 0.30
 0.25              +                     +
 0.20             +                       +
 0.15            +                         +
 0.10
 0.05           +                           +
 0.00+++++++++++                             +++++++++++
     |----|----|----|----|----|----|----|----|----|----|
    0.00     20.00     40.00     60.00     80.00    100.00

Universe of Discourse:  From   0.00  to  100.00
```

Finally, we can perform a defuzzification process on any fact to see its **crisp** value:

```bash
FuzzyCLIPS> (moment-defuzzify 3)
50.0
```

## Closing words

As I mentioned at the beginning of this article, the amount of information about this framework is quite scarce and it took me quite some time to gather all this information. Hopefully, more people will find it handy as well!

Thanks for reading.
