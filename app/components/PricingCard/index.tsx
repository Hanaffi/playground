import Image from 'next/image'
import Input from '../Input'
import styles from './PricingCard.module.scss'
import {  useState } from 'react'
import Checkbox from '../Checkbox'

const STANDARD_TIPS = [5, 10, 15, 25, 50];

type Tip = {
    value: number
    type: "custom" | "standard"
}


type PricingRowProps = {
    label: string
    value: number
}

function PricingRow({
    label,
    value
}: PricingRowProps) {
    const prettyValue = value.toFixed(2)

    return <div className={styles.row}>
        <div className={styles.pricingRowInfoWrapper}>
            <div className={styles.pricingRowLabel}>{label}</div>
            <div className={styles.pricingRowPerPerson}>/ person</div>
        </div>
        <div className={styles.pricingRowValue}>${prettyValue}</div>
    </div>
}


function PricingCard() {
    const [bill, setBill] = useState(0)
    const [people, setPeople] = useState(0)
    const [tip, setTip] = useState<Tip | null>(null)

    const tipAmountPerPerson = people == 0 ? 0 : bill * ((tip?.value ?? 0) / 100) / people
    const totalAmountPerPerson = people == 0 ? 0 : bill / people + tipAmountPerPerson

    const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBill(Number(e.target.value))
    }
    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeople(Math.floor(Number(e.target.value)))
    }

    const handleCustomBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTip({
            value: Number(e.target.value),
            type: "custom"
        })
    }

    const handleStandardBillClick = (standardTip: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTip(_prev => (event.target as HTMLInputElement).checked ? ({
            value: standardTip,
            type: "standard"
        }) : null)
    }

    const handleReset = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setBill(0)
        setPeople(0)
        setTip(null)
    }

    return <div className={styles.card}>
        <div className={styles.inputsWrapper}>
            <Input
                min="0"
                label="Bill"
                value={bill}
                onChange={handleBillChange}
                Icon={<Image src="icon-dollar.svg" alt="dollar" width={12} height={12} />}
            />

            <div className={styles.tipsWrapper}>
                {STANDARD_TIPS.map(standardTip => {
                        const checked = tip?.type == "standard" && tip?.value == standardTip

                        return <Checkbox key={standardTip} label={`${standardTip}%`}
                            checked={checked}
                            onChange={handleStandardBillClick(standardTip)}
                        />
                    })}
                <Input
                    min="0"
                    value={tip?.type == "custom" ? tip.value : ""}
                    onChange={handleCustomBillChange}
                    placeholder='Custom'
                    className={styles.customInput}
                />
            </div>

            <Input
                min="0"
                step={1}
                value={people}
                label="Number of People"
                onChange={handlePeopleChange}
                Icon={<Image src="icon-person.svg" alt="dollar" width={12} height={12} />}
            />
        </div>

        <div className={styles.resultWrapper}>
            <div className={styles.pricingRowsWrapper}>
                <PricingRow value={tipAmountPerPerson} label='Tip Amount' />
                <PricingRow value={totalAmountPerPerson} label='Total' />
            </div>

            <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
    </div>
}
export default PricingCard