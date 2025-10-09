import { JSX } from 'react';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page--not-found" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
    >
      <img
        className="not-found"
        src="img/404.svg"
        alt="Страница не найдена"
        width="500"
        height="500"
      />
      <div style={{
        fontSize: '20px',
        color: '#666',
        maxWidth: '800px',
        lineHeight: '1.5'
      }}
      >
        Ой, cтраница, которую вы ищете, не существует или была перемещена!
      </div>
    </div>
  );
}

export default NotFoundScreen;
