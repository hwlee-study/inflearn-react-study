import { fireEvent, render, screen } from '@testing-library/react'
import SimpleCounter from './SimpleCounter'

test('the counter start at 0', () => {
  render(<SimpleCounter />)
  const counterElement = screen.getByTestId('counter')
  expect(counterElement).toHaveTextContent(0)
})
test('minus button has correct test', () => {
  render(<SimpleCounter />)
  const minusButtonElement = screen.getByTestId('minus-button')
  expect(minusButtonElement).toHaveTextContent('-')
})
test('plus button has correct test', () => {
  render(<SimpleCounter />)
  const plusButtonElement = screen.getByTestId('plus-button')
  expect(plusButtonElement).toHaveTextContent('+')
})
test('when the + button is pressed, the counter change to 1', () => {
  render(<SimpleCounter />)
  const counterElement = screen.getByTestId('counter')
  const plusButtonElement = screen.getByTestId('plus-button')
  // button click
  fireEvent.click(plusButtonElement)
  expect(counterElement).toHaveTextContent(1)
})
test('on/off button has blue color', () => {
  render(<SimpleCounter />)
  const onOffButtonElement = screen.getByTestId('on/off-button')
  expect(onOffButtonElement).toHaveStyle({ backgroundColor: 'blue' })
})
test('prevent the +, - button from being pressed when the on/off button is clicked', () => {
  render(<SimpleCounter />)
  const onOffButtonElement = screen.getByTestId('on/off-button')
  const plusButtonElement = screen.getByTestId('plus-button')
  fireEvent.click(onOffButtonElement)
  expect(plusButtonElement).toBeDisabled()
})
