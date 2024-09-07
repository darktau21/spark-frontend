<template>
  <div>
    <div v-show="test.state === 'inProgress'" class="main_test" id="main_test">
      <h1>Опросник структуры темперамента</h1>
      <p class="help_txt">
        Вам предлагается оценить 77 утверждений, касающихся самых типичных ситуаций, используя шкалу
        от 1 до 4. Постарайтесь отвечать быстро, по Вашему первому впечатлению, но будьте уверены,
        что прочитали утверждение до конца. Помните, что нет “плохих” и “хороших” ответов.
      </p>
      <div id="quiz" class="quiz">
        <UiGradientBorder class="form-border" :border-width="4" :border-radius="50">
          <div class="pad">
            <p>
              <b>Утверждение №{{ test.currentQuestion.id }}</b>
            </p>
            <div>
              <p class="q-text">{{ test.currentQuestion.question }}</p>
              <div v-for="answer in test.currentQuestion.answers" :key="answer.id" class="test_mr">
                <input
                  type="radio"
                  :id="answer.id"
                  :name="`${test.currentQuestion.id}`"
                  :value="answer.value"
                  v-model="test.localResults[test.currentQuestion.id]"
                  @change="handleChange"
                  @click="handleAnswerClick"
                />
                <label :for="answer.id">{{ answer.name }}</label>
              </div>
            </div>
          </div>
        </UiGradientBorder>
      </div>
      <div class="test_btns">
        <UiButton @click="test.prev" variant="secondary">Назад</UiButton>
        <UiButton v-show="test.isLast" @click="handleEnd" :disabled="!test.isAllQuestionsCompleted" >Завершить тестирование</UiButton>
      </div>
    </div>

    <div v-show="test.state === 'start'" class="entry_test" id="entry_test">
      <AuthForm>
        <div class="cen">
          <UiGradientBorder class="form-border" :border-width="4" :border-radius="30">
            <div class="pad grid">
              <h1 class="for_text">Добро пожаловать в раздел “Тестирование”!</h1>
              <p class="for_text">
                Данное тестирование позволит определить ваш психотип. Чтобы начать, нажмите
                на кнопку ниже.
              </p>
              <UiButton @click="test.next">Начать тестирование</UiButton>
            </div>
          </UiGradientBorder>
        </div>
      </AuthForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { useTest } from '@/entities/test';
import { UiButton, UiGradientBorder } from '@/shared/ui';
import { AuthForm } from '@/widgets/AuthForm';
const user = useAccount();
const test = useTest();

const handleChange = () => {
  if (test.isLast) {
    return;
  }
  test.next();
}

const handleEnd = async  () => {
  if (!test.isLast) {
    return;
  }

  if (user.isAuthorized) {
    await test.save()
    return;
  }

  test.saveLocal();
}

const handleAnswerClick = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    target.dispatchEvent(new Event('change'))
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
  margin: 0 !important;
}

.main_test {
  padding-top: 3rem;
}

.quiz {
  max-width: 62%;
  margin-bottom: 40px;
  margin-top: 20px;
}
input {
  display: none;
}
.cen {
  align-self: center;
}
.entry_test {
  margin-bottom: 120px;
  margin-top: 40px;
}
.pad {
  padding: 40px;
}
label {
  padding: 10px 20px 10px 20px;
  border-radius: 40px;
  border: 1px solid rgba(3, 0, 124, 1);
  margin-bottom: 20px;
  color: rgba(3, 0, 124, 1);
  cursor: pointer;
  font-weight: 600;
}
label::first-child {
  border: none;
}

.test_mr {
  margin-bottom: 35px;
}
.q-text {
  margin-bottom: 20px;
}
input:checked + label {
  color: white;
  background-color: rgba(37, 78, 220, 1);
  border-color: rgba(37, 78, 220, 1);
}

.test_btns {
  display: flex;
  gap: 20px;
  margin-bottom: 120px;
}
.help_txt {
  max-width: 60%;
}
.for_text {
  text-align: center;
}
.grid {
  align-items: center;
  display: grid;
}
@media (max-width: 1024px) {
  .entry_test {
    margin-bottom: unset;
  }
}
@media (max-width: 900px) {
  .help_txt {
    max-width: 100%;
  }
  .quiz {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .pad {
    padding: 20px;
  }
  .test_btns {
    justify-content: center;
  }
}
</style>
