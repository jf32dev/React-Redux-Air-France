module.exports = {
    types: [
        {
            value: 'feat',
            name: 'feat:     A new feature',
        },
        {
            value: 'fix',
            name: 'fix:      A bug fix',
        },
        {
            value: 'docs',
            name: 'docs:     Documentation only changes',
        },
        {
            value: 'style',
            name:
                'style:    Changes that do not affect the meaning of the code\n            (styling, white-space, formatting, missing semi-colons, etc)',
        },
        {
            value: 'refactor',
            name:
                'refactor: A code change that neither fixes a bug nor adds a feature',
        },
        {
            value: 'perf',
            name: 'perf:     A code change that improves performance',
        },
        {
            value: 'test',
            name: 'test:     Adding missing tests or correcting existing tests',
        },
        {
            value: 'build',
            name:
                'build:    Changes that affect the build system or external dependencies\n            (example scopes: gulp, broccoli, npm)',
        },
        {
            value: 'chore',
            name:
                'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation\n            (example scopes: eslint, husky)',
        },
        {
            value: 'ci',
            name:
                'ci:       Changes to our CI configuration files and scripts\n            (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
        },
        {
            value: 'revert',
            name: 'revert:   Revert to a commit',
        },
    ],

    scopes: [],
    allowCustomScopes: false,

    // override the messages, defaults are as follows
    messages: {
        type: "Select the type of change that you're committing:",
        scope: 'Scope of this change:',
        subject:
            'Write a SHORT, IMPERATIVE tense description of the change (max: 72chars):\n',
        body:
            'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer:
            'List any Ticket Numbers by this change. E.g.: GS-31, GS-34:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },

    allowBreakingChanges: ['feat', 'fix'],

    // Subject Rule
    subjectLimit: 72,
    footerPrefix: 'Related Ticket Number:',

    // dont need to have ticket number, hotfix / quick fix sometimes doesn't need ticket number
    allowTicketNumber: false,
    isTicketNumberRequired: false,

    skipQuestions: ['scope']
};
