

interface Props {
  onBack: () => void;
}

interface Travel {
  id: number;
  destination: string;
  lodging: string;
  transport: string;
  activities: string[];
  days: number;
  travelers: number;
  budgetperperson: number;
  totalbudget: number;
}

export default function BudgetHistory({ onBack }: Props) {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/travels', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Error al obtener los viajes');

        const data: Travel[] = await res.json();
        setTravels(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  return (
    <div style={{ padding: 20, marginTop: "90px" }}>
      <h2>Historial de presupuestos</h2>

      <button
        onClick={onBack}
        style={{
          backgroundColor: '#ccc',
          padding: '10px 18px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          marginBottom: 20,
          fontWeight: 'bold'
        }}
      >
        ← Volver
      </button>

      {loading && <p>Cargando presupuestos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && travels.length === 0 && (
        <p>No se encontraron presupuestos.</p>
      )}

      {travels.map((t) => (
        <div
          key={t.id}
          style={{
            border: '1px solid #ccc',
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
            backgroundColor: '#fafafa'
          }}
        >
          <p><strong>Destino:</strong> {t.destination}</p>
          <p><strong>Alojamiento:</strong> {t.lodging}</p>
          <p><strong>Transporte:</strong> {t.transport}</p>
          <p><strong>Días:</strong> {t.days}</p>
          <p><strong>Viajeros:</strong> {t.travelers}</p>
          <p>
            <strong>Actividades:</strong>{' '}
            {t.activities.length > 0 ? t.activities.join(', ') : 'Ninguna'}
          </p>

          <p>
            <strong>Presupuesto por persona:</strong>{' '}
            {`$ ${t.budgetperperson.toLocaleString('es-CO')}`}
          </p>
          <p>
            <strong>Presupuesto total:</strong>{' '}
            {`$ ${t.totalbudget.toLocaleString('es-CO')}`}
          </p>
        </div>
      ))}
    </div>
  );
}
