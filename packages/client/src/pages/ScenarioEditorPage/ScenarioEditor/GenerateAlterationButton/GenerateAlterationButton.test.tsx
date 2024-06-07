import {
  GenerateAlterationButton,
  GenerateAlterationButtonTestIds,
} from './GenerateAlterationButton'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import * as getMonacoEditorContentModule from '../../../../utils/getMonacoEditorContent/getMonacoEditorContent'
import userEvent from '@testing-library/user-event'
import { FileFormat } from '@smartesting/shared/dist'

describe('GenerateAlterationButton', () => {
  const optionsAlteration = {
    haveLabel: false,
    haveNoise: false,
    haveDisableAltitude: false,
    haveDisableLatitude: false,
    haveDisableLongitude: false,
    haveRealism: false,
  }
  const recording = { content: 'A message', name: 'Aircraft disappearance' }

  it('is disable if Monaco is not initialized', () => {
    render(
      <GenerateAlterationButton
        recording={recording}
        optionsAlteration={optionsAlteration}
        outputFormat={FileFormat.sbs}
        onClicked={() => null}
      />
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  describe('when monaco is initialized', () => {
    describe('and scenario is valid', () => {
      beforeEach(() => {
        jest
          .spyOn(getMonacoEditorContentModule, 'getMonacoEditorContent')
          .mockReturnValue('hide all_planes at 0 seconds')
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('is enable if recording is valid', () => {
        render(
          <GenerateAlterationButton
            scenario={'hide all_planes at 0 seconds'}
            recording={recording}
            optionsAlteration={optionsAlteration}
            outputFormat={FileFormat.sbs}
            onClicked={() => null}
          />
        )
        expect(screen.getByRole('button')).not.toBeDisabled()
      })

      it('is disable if recording content is empty', () => {
        render(
          <GenerateAlterationButton
            scenario={'hide all_planes at 0 seconds'}
            recording={{ ...recording, content: '' }}
            optionsAlteration={optionsAlteration}
            outputFormat={FileFormat.sbs}
            onClicked={() => null}
          />
        )
        expect(screen.getByRole('button')).toBeDisabled()
      })

      it('is disable if recording name is empty', () => {
        render(
          <GenerateAlterationButton
            scenario={'hide all_planes at 0 seconds'}
            recording={{ ...recording, name: '' }}
            optionsAlteration={optionsAlteration}
            outputFormat={FileFormat.sbs}
            onClicked={() => null}
          />
        )
        expect(screen.getByRole('button')).toBeDisabled()
      })

      it('calls onClicked with args', async () => {
        const callback = jest.fn()
        render(
          <GenerateAlterationButton
            scenario={'hide all_planes at 0 seconds'}
            recording={recording}
            optionsAlteration={optionsAlteration}
            outputFormat={FileFormat.sbs}
            onClicked={callback}
          />
        )

        await userEvent.click(
          screen.getByTestId(GenerateAlterationButtonTestIds.COMPONENT)
        )

        await waitFor(() => {
          expect(callback).toBeCalledTimes(1)
        })
        await waitFor(() => {
          expect(callback).toBeCalledWith({
            scenario: 'hide all_planes at 0 seconds',
            optionsAlteration: optionsAlteration,
            recording: { content: 'A message', name: 'Aircraft disappearance' },
            outputFormat: FileFormat.sbs,
          })
        })
      })
    })
  })
})
