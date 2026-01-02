INSERT INTO
    users (username, email, hashed_password)
VALUES
    ('Jesus', 'jesus@ejemplo.com', '123456'),
    ('Gabriela', 'gaby@ejemplo.com', '123456');

INSERT INTO
    todo_notes (title, body, id_user)
VALUES
    (
        'Hacer la cama',
        'Tengo la cama hecha mierda',
        (
            SELECT
                id_user
            FROM
                users
            WHERE
                username = 'Jesus'
        )
    ),
    (
        'Terminar la tarea',
        'Terminar lo de db',
        (
            SELECT
                id_user
            FROM
                users
            WHERE
                username = 'Jesus'
        )
    ),
    (
        'Poner bonito el cuarto',
        'Acomodar la cama y las demas cositas',
        (
            SELECT
                id_user
            FROM
                users
            WHERE
                username = 'Gabriela'
        )
    ),
    (
        'Escibirle a mis amigos',
        'Responder los mensajes pendientes',
        (
            SELECT
                id_user
            FROM
                users
            WHERE
                username = 'Gabriela'
        )
    );

SELECT
    u.username,
    n.title,
    n.body,
    n.todo_state state
FROM
    users AS u
    NATURAL JOIN todo_notes as n;