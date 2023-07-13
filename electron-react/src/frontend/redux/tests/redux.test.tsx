import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { renderWithProviders } from './renderWithProviders'
import { setupStore } from '../store';

import { useAppSelector } from '../hooks'
import { actions, selectors } from '../dirDataSlice';

const TestComponent = () => {
  const children = useAppSelector((state) => selectors.selectAllChildren(state, 'mobs'));

  return (
    <>
      <h1>Children</h1>
      <div id='container'>{children.map(child => <div key={child.path}>{child.name}</div>)}</div>
    </>
  )
}

test('renders', async () => {
  const store = setupStore()
  store.dispatch(actions.addOne({
    type: 'dir',
    name: 'mobs',
    path: 'mobs',
    childPaths: ['mobs/cat.json', 'mobs/bat.json']
  }))
  store.dispatch(actions.addOne({
    type: 'file',
    name: 'cat.json',
    path: 'mobs/cat.json',
    content: '{"hello": "cat"}',
    contentOnDisk: '{"hello": "cat"}',
    jsonErrors: []
  }))
  store.dispatch(actions.addOne({
    type: 'file',
    name: 'bat.json',
    path: 'mobs/bat.json',
    content: '{"hello": "bat"}',
    contentOnDisk: '{"hello": "bat"}',
    jsonErrors: []
  }))

  renderWithProviders(<TestComponent />, { store })

  expect(screen.getByText(/cat.json/i)).toBeInTheDocument()
  expect(screen.getByText(/bat.json/i)).toBeInTheDocument()
  expect(screen.queryByText(/mobs/i)).not.toBeInTheDocument()
})
