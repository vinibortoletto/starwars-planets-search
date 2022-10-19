import React from 'react'
import {render, screen} from '@testing-library/react'
import PLANETS_MOCK from './mocks/planets.mock'
import App from '../App';

const ENDPOINT = 'https://swapi.dev/api/planets'

describe.skip('App', () => {
  it('1. should call api on mount', () => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(PLANETS_MOCK)
    }))

    render(<App />);
    
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
  });
});