import React from 'react'

import { Main } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

export default props => <ElmWrapper src={Main} props={props} />
