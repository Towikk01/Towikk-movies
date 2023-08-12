import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

import './genre-menu-new.scss';

const buttonList = [
    {
        name: 'Popular Movies',
        to: '/popular-movies',
        variant: 'light',
        divider: true,
    },
    {
        name: 'Family',
        to: '/family',
        variant: 'warning',
    },
];

const GenreMenuNew = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div id="overlay" style={{ display: open ? 'block' : 'none' }} onClick={() => setOpen(!open)}></div>
            <Button 
                onClick={() => setOpen(!open)}
                variant="light"
                size="sm"
            >
                <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="position-fixed h-100 bg-dark text-light" style={{ top: 0, left: 0 }}>
                <Collapse in={open} dimension="width">
                    <div className="p-3">
                        {
                            buttonList.map((item, index) => (
                                <div key={index}>
                                    <Link to={item.to}>
                                        <Button variant={item.variant} className="mb-2" onClick={() => setOpen(!open)}>
                                            <span className="text-nowrap">{item.name}</span>
                                        </Button>
                                    </Link>
                                    {item.divider && <hr />}
                                </div>
                            ))
                        }
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default GenreMenuNew;