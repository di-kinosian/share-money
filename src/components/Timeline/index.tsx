import dayjs, { Dayjs } from "dayjs";
import {FC} from 'react';
import { useEffect, useMemo, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import Day from './components/Day'

interface IProps {
    blockWidth?: number;
    onChange: (date: Dayjs) => void;
}


const INITIAL_DATE = dayjs();

const MINUTES_IN_DAY = 60 * 24;

const useInitialOffset = (width: number, itemWidth: number, startDate: Dayjs) => {
    return useMemo(() => {
        const offset = width / 2 - (dayjs().diff(startDate, 'm') / MINUTES_IN_DAY) * itemWidth
        return offset;
    }, [width, itemWidth, startDate]);
}

const prepareDays = (startDate: Dayjs, qty: number) => {
    
    const list = [];
    let a = startDate.startOf('day');
    for (let i = 0; i < qty; i++) {
        list.push({
            name: a.format('DD MMM, ddd'),
            date: a,
            current: a.format('DD MMM') === dayjs().format('DD MMM'),
        });
        a = a.add(1, 'day');
    }
    return list
}

const Timeline: FC<IProps> = ({
    blockWidth = 150,
    onChange,
}) => {
    const [startDate, setStartDate] = useState(INITIAL_DATE.startOf('day').subtract(10, 'day'));
    const [startX, setStartX] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [endX, setEndX] = useState(0)
    const { width: containerWidth = 0, ref: containerRef } = useResizeDetector();
    const initialOffset = useInitialOffset(containerWidth, blockWidth, startDate);
    const [offset, setOffset] = useState(0)
    const [deltaOffset, setDeltaOffset] = useState(0);

    const [daysList, setDaysList] = useState(prepareDays(startDate, 20));

    const onMouseDown = (e: any) => {
        setStartX(e.clientX)
        setClicked(true)
    }

    const onMouseMove = (e: any) => {
        if (clicked) {
            setEndX(e.clientX)
            checkDayList()
        }
    }

    const onMouseUp = () => {
        setClicked(false)
        setOffset(offset + deltaOffset);
        setDeltaOffset(0);
        setStartX(0)
        setEndX(0)
    }

    const offsetFromStartDate = useMemo(() => {
        return -1 * (offset + deltaOffset + initialOffset - containerWidth / 2)
    },[containerWidth, deltaOffset, initialOffset, offset])

    const dateFromOffset = useMemo(() => startDate.add(offsetFromStartDate / blockWidth * MINUTES_IN_DAY, 'minute'),[offsetFromStartDate, startDate, blockWidth])
    useEffect(() => {
        if (endX) {
            setDeltaOffset(endX - startX)
        }
    }, [endX, startX])

    useEffect(() =>{
        onChange(dateFromOffset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dateFromOffset])

    const checkDayList = () => {
        if (dateFromOffset.diff(daysList[0].date, 'd') < 5) {
            const newPotrion = prepareDays(daysList[0].date.subtract(20, 'day'), 20)
            setDaysList([...newPotrion, ...daysList])
            setStartDate(newPotrion[0].date)
        }

        if (daysList[daysList.length - 1].date.diff(dateFromOffset, 'd') < 5) {
            const newPotrion = prepareDays(daysList[daysList.length - 1].date.add(1, 'day'), 20)
            setDaysList([...daysList, ...newPotrion])
        }
    }

    const onTouchStart = (e: any) => {
        setStartX(e.changedTouches[0].clientX)
        setClicked(true)
    }

    const onTouchMove = (e: any) => {
        if (clicked) {
            setEndX(e.changedTouches[0].clientX)
            checkDayList()
        }
    }

    const onTouchEnd = () => {
        setClicked(false)
        setOffset(offset + deltaOffset);
        setDeltaOffset(0);
        setStartX(0)
        setEndX(0)
    }

    return (
        <div
            style={{
                position: 'relative',
                marginTop: '8px',
                width: '100%',
                overflow: 'hidden',
                userSelect: 'none',
            }}
            ref={containerRef}
        >
            
            <div style={{
                position: 'absolute',
                margin: 'auto',
                left: 0,
                right: 0,
                width: '1px',
                borderLeft: '1px solid red',
                height: '100%',
                zIndex: 2,
            }} />

            <div
                style={{
                    height: '100px',
                    background: 'green',
                    position: 'relative',

                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {
                    containerWidth && daysList.map((day, index) => (
                        <Day
                            key={day.name}
                            isActive={day.current}
                            label={day.name}
                            offset={offset + deltaOffset + initialOffset + index * blockWidth}
                            width={blockWidth}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Timeline