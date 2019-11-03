import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { createStore } from 'redux'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero is sent', () => {
    const action = {type: 'ZERO'}
    const state = {
      good: 5,
      ok: 4,
      bad: 1
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('5 good, 4 ok, 2 bad sent', () => {
    const store = createStore(counterReducer)

    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'OK'})
    store.dispatch({type: 'OK'})
    store.dispatch({type: 'OK'})
    store.dispatch({type: 'OK'})
    store.dispatch({type: 'BAD'})
    store.dispatch({type: 'BAD'})
    expect(store.getState()).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    })
  })
})