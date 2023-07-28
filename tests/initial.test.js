import * as func from '../index'
import { test, expect } from 'vitest'

test('test setup working', () => {
  expect(true).toBeTruthy()
})

test('test reading file', async () => {
  const path = './tests/test.txt'
  const expected = 'Hello World!'
  const actual = await func.readText(path)

  expect(actual).toBe(expected)
})

test('test writing file', async () => {
  const path = './tests/writeTest.txt'
  const expected = 'YAY! It is Friday!'
  await func.writeText(path, expected)
  const actual = await func.readText(path)
  // Remove what was written after the test
  await func.writeText(path, '')

  expect(actual).toBe(expected)
})
