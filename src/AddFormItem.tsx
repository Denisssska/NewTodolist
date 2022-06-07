import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";

type AddFormItemType = {
    addItem: (title: string) => void

}
export const AddFormItem =React.memo((props: AddFormItemType) => {
    console.log('additemform')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!== null){
            setError(null);
        }
        if (e.key === 'Enter') {
            addTask();
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <IconButton color="secondary" onClick={addTask}><Fingerprint/></IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

