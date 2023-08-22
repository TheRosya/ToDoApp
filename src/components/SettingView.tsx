import { useState } from "react";
import React from 'react';
import './../styles/ViewSettings.css'
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import SettingsViewMenu from "./SettingsViewMenu";
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function SettingView ({ view, setView }) {
    console.log('render SettingsView')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
            <ClickAwayListener onClickAway={() => {            
                setAnchorEl(null)
                console.log(1)
            }}>
                <div style={{textAlign: 'right'}}>
                    <button className="open_button" aria-describedby={id} type="button" onClick={handleClick}>
                        <FontAwesomeIcon icon={faSliders} />
                    </button>

                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <SettingsViewMenu view={view} setView={setView}/>
                    </Popper>
                </div>
            </ClickAwayListener>
    )
}

export default SettingView;