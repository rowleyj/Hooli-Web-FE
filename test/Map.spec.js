import { mount } from '@vue/test-utils'
import Map from '../components/Map'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Map)
    expect(wrapper.vm).toBeTruthy()
  })
})
