module.exports = [
    {
        label: 'Different',
        submenu: [
            { label: 'Item1' },
            { label: 'Item2' },
            { label: 'Item3' },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'redo' },
        ]
    },
    {
        label: 'Actions',
        submenu: [
            { 
                label: 'Action 1',
                // role: 'toggleFullScreen'
                // role: 'toggleDevTools'
                // enabled: false
            },
            { label: 'Action 2' },
            {
                label: 'Greet',
                click: () => { console.log('Hello from Main Menu') },
                accelerator: 'Option + Shift + G'
            },
        ]
    }
];