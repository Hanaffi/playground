import Image from 'next/image'
import Input from '../Input'
import styles from './PricingCard.module.scss'
import { useState } from 'react'
import Checkbox from '../Checkbox'
import Button from '../Button'

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
    const [people, setPeople] = useState(1)
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

    const handleStandardBillClick = (standardTip: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setTip(_prev => (e.target as HTMLInputElement).checked ? ({
            value: standardTip,
            type: "standard"
        }) : null)
    }

    const handleReset = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setBill(0)
        setPeople(1)
        setTip(null)
    }

    return <div className={styles.card}>
        <div className={styles.inputsWrapper}>
            <Input
                type="number"
                min="0"
                pattern="[0-9]*"
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
                    type="number"
                    min="0"
                    pattern="[0-9]*"
                    value={tip?.type == "custom" ? tip.value : ""}
                    placeholder='Custom'
                    onChange={handleCustomBillChange}
                    className={styles.customInput}
                />
            </div>

            <Input
                min="0"
                type="number"
                pattern="[0-9]*"
                step={1}
                value={people}
                label="Number of People"
                error={people == 0 ? "Can't be zero" : undefined}
                onChange={handlePeopleChange}
                Icon={<Image src="icon-person.svg" alt="dollar" width={12} height={12} />}
              
            />
        </div>

        <div className={styles.resultWrapper}>
            <div className={styles.pricingRowsWrapper}>
                <PricingRow value={tipAmountPerPerson} label='Tip Amount' />
                <PricingRow value={totalAmountPerPerson} label='Total' />
            </div>

            <Button onClick={handleReset}>Reset</Button>
        </div>
    </div>
}
export default PricingCard