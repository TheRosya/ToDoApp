import { useEffect, useRef, useState } from "react";
import React from 'react';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import SettingsViewMenu from "./SettingsViewMenu";


const SettingView = ({ setView }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className='flex flex-col items-end text-right pt-4 pr-4'>
            <ClickAwayListener onClickAway={() => {            
                setAnchorEl(null)
                console.log(1)
            }}>
                <div>
                    <button aria-describedby={id} type="button" onClick={handleClick}>
                        Настроить вид
                    </button>

                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <SettingsViewMenu setView={setView}/>
                    </Popper>
                </div>
            </ClickAwayListener>
        
        </div>
        
    )
}

export default SettingView;