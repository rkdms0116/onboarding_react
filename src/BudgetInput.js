import {useState, useEffect} from "react";

export default function BudgetInput({id, purpose, price, detail, isSave, isActive, isFirst, onDelete, onSave, onModi, onUndo, onChange}) {

    const [localPurpose, setLocalPurpose] = useState(purpose||"");
    const [localPrice, setLocalPrice] = useState(price||"");
    const [localDetail, setLocalDetail] = useState(detail||"");

    useEffect(() => {
            setLocalPurpose(purpose);
            setLocalPrice(price);
            setLocalDetail(detail);
    }, [isActive]);

    const handlePuropseChange = (e) => {
        setLocalPurpose(e.target.value);
    };

    const handlePriceChange = (e) => {
        const regex = /^[0-9]*$/;

        let targetPrice = e.target.value;

        if (targetPrice === "" || regex.test(targetPrice)) {
            if (targetPrice.length > 10) {
                targetPrice = targetPrice.slice(0, 10); // 10자 제한
            }
            setLocalPrice(targetPrice);
        }
    };

    const handleDetailChange = (e) => {
        setLocalDetail(e.target.value);
    };

    const handleSave = () => {
        if (localPurpose&&localPrice){
            onSave(id, localPurpose, localPrice, localDetail);
        }else{
            return alert("사용처 또는 금액을 넣으세요");
        }
    }

    const handleModi = () => {
        onModi(id);
        onChange(id);
    }

    const handleUndo = () => {
        setLocalPurpose(purpose);
        setLocalPrice(price);
        setLocalDetail(detail);
        onUndo(id);
    };

    return (
        <div key={id}>
            <input
                type="text"
                maxLength="20"
                value={localPurpose}
                placeholder="사용처"
                onChange={handlePuropseChange}
                readOnly={isSave}
            />
            <input
                type="text"
                maxLength="20"
                value={localPrice}
                placeholder="금액"
                onChange={handlePriceChange}ek
                readOnly={isSave}
            />
            <input
                type="text"
                maxLength="50"
                value={localDetail}
                placeholder="상세 사용 내역"
                onChange={handleDetailChange}
                readOnly={isSave}
            />

            <button onClick={() => onDelete(id)}>
                X
            </button>
            {
                ( isSave ) ?
                (<button onClick={handleModi}>수정</button>) :
                <>
                    {(!isFirst && isActive) && <button onClick={handleUndo}> Undo </button>}
                    <button onClick={handleSave}>SAVE</button>
                </>
            }
        </div>
    )

}