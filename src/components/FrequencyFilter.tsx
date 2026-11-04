import type { FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FREQ_MAX, FREQ_MIN } from '../modules/routersApi'
import './FrequencyFilter.css'

interface Props {
  freqMin: number
  freqMax: number
  setFreqMin: (value: number) => void
  setFreqMax: (value: number) => void
  onSubmit: () => void
  loading?: boolean
  buttonTitle?: string
}

export const FrequencyFilter = ({
  freqMin,
  freqMax,
  setFreqMin,
  setFreqMax,
  onSubmit,
  loading,
  buttonTitle = 'По частоте',
}: Props) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Form className="filter-panel" onSubmit={handleSubmit}>
      <div className="slider-block">
        <Form.Group className="slider-row" controlId="freq-min">
          <Form.Label className="slider-label">
            от <b>{freqMin}</b> ГГц
          </Form.Label>
          <Form.Range
            min={FREQ_MIN}
            max={FREQ_MAX}
            step={0.1}
            value={freqMin}
            onChange={(event) => setFreqMin(Number(event.target.value))}
          />
        </Form.Group>
        <Form.Group className="slider-row" controlId="freq-max">
          <Form.Label className="slider-label">
            до <b>{freqMax}</b> ГГц
          </Form.Label>
          <Form.Range
            min={FREQ_MIN}
            max={FREQ_MAX}
            step={0.1}
            value={freqMax}
            onChange={(event) => setFreqMax(Number(event.target.value))}
          />
        </Form.Group>
      </div>
      <Button type="submit" className="search-btn" disabled={loading}>
        {buttonTitle}
      </Button>
    </Form>
  )
}

export default FrequencyFilter
