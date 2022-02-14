import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Green = '#65CA75'

export default function Arrow({ lastUpdateStatus }: { lastUpdateStatus: string }) {
    return (
        <FontAwesomeIcon
            color={lastUpdateStatus === 'increased' ? Green : 'red'}
            height="5px"
            fontSize={16}
            icon={faLongArrowAltUp}
            style={{
                opacity: lastUpdateStatus === 'same' ? 0 : 1,
                rotate: lastUpdateStatus === 'decreased' ? '180deg' : '',
            }}
        />
    )
}
