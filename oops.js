'use strict'

// One sequence can match multiple petterns
const methodCall = /\.\w+\(/
const methodCallWithoutArgs = /\.\w+\(\)/
const getter = /\.get[A-Z]\w*\(\)/  // Safely expose private things
const setter = /\.set[A-Z]\w*\(/  // Assignment operator in OOP
const classDef = /\bclass\b/  // If it uses class, it must be OOP
const newOp = /\bnew\b/  // OOP wizards may cast spell "Dog dog = new Dog()" to summon dog

function calculateScore(input) {
  console.assert(typeof input === 'string')

  const lines = input.split('\n')
  console.assert(lines.length > 0)

  let wordCount = input.split(/\W+/).filter(str => (str.length > 0)).length
  if (wordCount < 1) return 0

  let score = 0
  for (let line of lines) {
    score += countMatches(line, methodCall) * 2
    score += countMatches(line, methodCallWithoutArgs) * 2
    score += countMatches(line, getter) * 2
    score += countMatches(line, setter) * 6
    score += countMatches(line, classDef) * 12
    score += countMatches(line, newOp) * 5
  }

  return score * 100 / wordCount
}

function countMatches(str, regex) {
  console.assert(typeof str === 'string')

  const matches = str.match(regex)
  return (matches == null) ? 0 : matches.length
}
