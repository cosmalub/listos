import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const GuaranteeAndRefund = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Content */}
            <main className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 -ml-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                </Button>

                <article className="prose prose-gray lg:prose-lg max-w-none">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Гарантія та повернення коштів</h1>
                    <p className="text-xl text-gray-600 mb-8">сервісу «Листосик»</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p className="font-medium text-lg">
                            Ми розуміємо: Листосик — це не просто послуга.
                            <br />
                            Це емоція, момент і відповідальність.
                        </p>
                        <p>
                            Саме тому ми не ховаємося за формальностями
                            і розглядаємо кожне звернення індивідуально.
                        </p>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Наша позиція</h2>
                            <p className="mb-2">
                                Ми беремо на себе відповідальність за результат після оплати.
                                <br />
                                Якщо щось пішло не так — ви не залишаєтесь наодинці з проблемою.
                            </p>
                            <p className="font-medium">
                                Наша мета — не «закрити кейс»,
                                <br />
                                а знайти рішення, з яким вам буде ок.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Коли можливе повернення коштів або повторне виготовлення</h2>
                            <p className="mb-4">
                                Ми гарантуємо індивідуальний розгляд звернення у всіх випадках, зокрема якщо:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>сталася технічна помилка сервісу;</li>
                                <li>є дефекти друку або пошкодження під час доставки;</li>
                                <li>фізична листівка не відповідає затвердженому макету;</li>
                                <li>результат субʼєктивно не відповідає вашим очікуванням, навіть якщо формально все виконано коректно.</li>
                            </ul>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Як ми діємо</h2>
                            <p className="mb-2">У кожному випадку ми:</p>
                            <ol className="list-decimal pl-6 mb-4 space-y-1">
                                <li>уважно розглядаємо звернення;</li>
                                <li>уточнюємо деталі та очікування;</li>
                                <li>пропонуємо рішення.</li>
                            </ol>
                            <p className="mb-2">Залежно від ситуації це може бути:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>повторне виготовлення листівки;</li>
                                <li>корекція цифрової частини;</li>
                                <li>часткове або повне повернення коштів.</li>
                            </ul>
                            <p className="font-medium">
                                Формат рішення визначається індивідуально
                                з повагою до вас і до роботи сервісу.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Важливо знати</h2>
                            <p className="mb-2">
                                Ми довіряємо нашим користувачам,
                                але залишаємо за собою право відмовити у поверненні коштів
                                у разі очевидного зловживання або неодноразових безпідставних звернень.
                            </p>
                            <p>
                                Це необхідно для того, щоб сервіс залишався чесним для всіх.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Як звернутися</h2>
                            <p className="mb-4">
                                Якщо у вас виникли сумніви або питання після отримання листівки —
                                просто напишіть нам.
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>Email: melodlistiv@gmail.com</li>
                                <li>Telegram: @genbyhuman</li>
                            </ul>
                            <p className="font-medium">
                                Ми відповідаємо по-людськи і без шаблонних відписок.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section className="text-center pt-4">
                            <p className="font-bold text-gray-900 mb-2">Сервіс «Листосик»</p>
                            <p className="text-gray-600 italic">
                                Ми поруч, поки важливі слова не знайдуть свою форму.
                            </p>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default GuaranteeAndRefund;
