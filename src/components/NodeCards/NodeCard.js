import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles({
    card: {
        width: 150,
        height: 100,
        transition: 'background-color 0.3s ease',
    },
    leafNode: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#FDE3A7 !important',
            border: '2.5px solid #FFFF00'
        },
    },
    clicked: {
        backgroundColor: '#FDE3A7 !important',
        border: '2.5px solid #FFFF00',
    },
});

function NodeCard(props) {

    const {
        title = 'No Title Found',
        description = 'No Description Found',
        data,
        itemConfig,
        selectedCard,
        setSelectedCard,
    } = props;
    const [isClicked, setIsClicked] = useState(false);
    const classes = useStyles();

    const hasChildren = data.filter(item => item.parent === itemConfig.id).length > 0;
    const isLeafNode = !hasChildren;
    const isSelected = selectedCard === itemConfig.id;


    const handleClick = () => {
        if (isLeafNode) {
            if (isSelected) {
                setSelectedCard(null);
            } else {
                setSelectedCard(itemConfig.id);
            }
        }
    };

    return (
        <Card
            className={`${classes.card} 
            ${isLeafNode ? classes.leafNode : ''}
             ${selectedCard === itemConfig.id ? classes.clicked : ''}`}
            style={{ backgroundColor: '#FFE5E5' }}
            onClick={handleClick}
        >
            <CardHeader
                sx={{ borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}
                style={{ textTransform: 'capitalize', paddingRight: '10px' }}
                title={title}
                titleTypographyProps={{ fontSize: '14px', fontWeight: '800', textAlign: 'center' }}
            />

            <CardContent>
                <Typography
                    style={{ textTransform: 'capitalize', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}
                    variant="body2" color="text.primary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NodeCard;