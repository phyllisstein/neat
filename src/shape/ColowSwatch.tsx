import {
    Box,
    Portal,
    FormGroup,
    FormControlLabel,
    Typography
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import { ChromePicker, ColorResult } from "react-color";

export function ColorSwatch({
                                color,
                                onChange,
                                enabled,
                                setEnabled
                            }: {
    color: string,
    onChange: (color: string) => void,
    enabled: boolean,
    setEnabled: (enabled: boolean) => void
}) {

    const [displayColorPicker, setDisplayColorPicker] = React.useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color: ColorResult) => {
        onChange(color.hex);
    };

    return (<>
            <Box>
                <Box sx={{
                    padding: '4px',
                    background: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                }} onClick={handleClick}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '2px',
                        background: enabled ? color : `repeating-linear-gradient(
                                                                45deg,
                                                        ${color},
                                                        ${color} 8px,
                                                        #CCC 8px,
                                                        #CCC 16px
                                                        )`
                    }}/>
                </Box>


            </Box>

            <Portal>
                {displayColorPicker && <Box sx={{
                    position: 'absolute',
                    zIndex: 1300,
                }}>

                    <Box sx={{
                        position: 'fixed',
                        top: '0px',
                        left: '0px',
                        width: "100vw",
                        height: "100vh",
                    }} onClick={handleClose}/>

                    <Box sx={{
                        position: 'fixed',
                        top: '144px',
                        left: '40px',
                        background: "white",
                        borderRadius: "4px",
                        "& > *": {
                            boxShadow: "inherit !important"
                        },
                        // boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px, rgb(0 0 0 / 30%) 0px 4px 8px"
                    }}>
                        <FormGroup >
                            <FormControlLabel
                                value={enabled}
                                sx={{ p: 2 }}
                                control={<Checkbox
                                    checked={enabled}
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setEnabled(evt.target.checked)}/>}
                                label={<Typography variant={"button"}>Enabled</Typography>}/>
                        </FormGroup>
                        <ChromePicker disableAlpha={true}
                                      color={color}
                                      onChange={handleChange}/>
                    </Box>

                </Box>}

            </Portal>

        </>
    )
}
