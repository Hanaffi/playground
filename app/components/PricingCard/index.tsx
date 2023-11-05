import Image from 'next/image'
import Input from '../Input'
import styles from './PricingCard.module.scss'
import { useState } from 'react'
import Checkbox from '../Checkbox'

const STANDARD_TIPS = [5, 10, 15, 25, 50];

type Tip = {
    value: number
    type: "custom" | "standard"
}

function PricingCard() {
    const [bill, setBill] = useState(0)
    const [people, setPeople] = useState(0)
    const [tip, setTip] = useState<Tip | null>(null)

    const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBill(Number(e.target.value))
    }
    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeople(Math.floor(Number(e.target.value)))
    }

    return <div className={styles.card}>
        <div className="inputsWrapper">
            <Input
                min="0"
                label="Bill"
                value={bill}
                onChange={handleBillChange}
                Icon={<Image src="icon-dollar.svg" alt="dollar" width={12} height={12} />}
            />
            <Input
                min="0"
                step={1}
                label="Number of People"
                value={people}
                onChange={handlePeopleChange}
                Icon={<Image src="icon-person.svg" alt="dollar" width={12} height={12} />}
            />

            <div className={styles.tipsWrapper}>
            {
                STANDARD_TIPS.map(standardTip => {
                    const checked = tip?.type == "standard" && tip?.value == standardTip

                    return <Checkbox key={standardTip} label={`${standardTip}%`}
                        checked={checked}
                        onChange={(event) => {
                            setTip(prev=>(event.target as HTMLInputElement).checked ? ({
                                value: standardTip,
                                type: "standard"
                            }) : null)
                        }}

                    />
                })
            }

            <Input min="0" value={tip?.type == "custom" ? tip.value : ""} onChange={event => {
                setTip({
                    value: Number((event.target as HTMLInputElement).value),
                    type: "custom"
                })
            }}
                placeholder='Custom'
            />
            </div>
        </div>
    </div>
}
export default PricingCard