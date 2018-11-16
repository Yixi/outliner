import BulletPointComponent from '@root/views/editor-area/bullet-point/index'
import * as React from 'react'
import { shallow } from 'enzyme'
import { UI } from '@root/store/UI'
import { ContentState} from 'draft-js'
import { IBulletPoint } from '@root/store/data'

const BulletPoint = BulletPointComponent as any

const ui = new UI()

describe('test BulletPoint View', () => {
  test('should render correct', () => {

    const bulletPoint: IBulletPoint = {
      id: '1',
      content: ContentState.createFromText('123'),
      parentId: null,
      expand: true,
      children: [],
    }

    const wrapper = shallow(
      <BulletPoint.wrappedComponent
        ui={ui}
        bulletPoint={bulletPoint}
        index={0}
      />,
    )

    expect(wrapper.find('.bullet-point-content').length).toEqual(1)
  })
})
