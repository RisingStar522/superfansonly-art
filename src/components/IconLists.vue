<template>
  <ul>
    <li
      v-for="(item, index) in socialMedia"
      :key="index"
      :class="item?.socialNetwork"
    >
      <a :href="item?.userId">
        <span>{{ item?.socialNetwork }}</span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "IconLists",
  props: ["socialMedia"],
  setup() {},
};
</script>
<style scoped>
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  margin: 10px 5px;
}

ul li a .fa {
  font-size: 40px;
  color: #262626;
  line-height: 80px;
  transition: 0.5s;
  padding-right: 14px;
}

ul li a span {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 20px;
  color: #262626;
  letter-spacing: 4px;
  transition: 0.5s;
}

ul li a {
  text-decoration: none;
  display: absolute;
  display: block;
  width: 150px;
  height: 60px;
  background: #fff;
  text-align: left;
  padding-left: 20px;
  transform: rotate(-30deg) skew(25deg) translate(0, 0);
  transition: 0.5s;
  box-shadow: -20px 20px 10px rgba(0, 0, 0, 0.5);
}
ul li a:before {
  content: "";
  position: absolute;
  top: 10px;
  left: -20px;
  height: 100%;
  width: 20px;
  background: #b1b1b1;
  transform: 0.5s;
  transform: rotate(0deg) skewY(-45deg);
}
ul li a:after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: -10px;
  height: 20px;
  width: 100%;
  background: #b1b1b1;
  transform: 0.5s;
  transform: rotate(0deg) skewX(-45deg);
}

ul li a:hover {
  transform: rotate(-30deg) skew(25deg) translate(20px, -15px);
  box-shadow: -50px 50px 50px rgba(0, 0, 0, 0.5);
}

ul li:hover .fa {
  color: #262626;
}

ul li:hover span {
  color: #262626;
}

.Facebook a {
  background: #3b5998;
}
.Facebook:hover a {
  background: #3b5998;
}
.Facebook:hover a:before {
  background: #365492;
}
.Facebook:hover a:after {
  background: #4a69ad;
}

.Twitter:hover a {
  background: #00aced;
}
.Twitter a {
  background: #00aced;
}
.Twitter:hover a:before {
  background: #097aa5;
}
.Twitter:hover a:after {
  background: #53b9e0;
}

.Google a {
  background: #dd4b39;
}
.Google:hover a {
  background: #dd4b39;
}
.Google:hover a:before {
  background: #b33a2b;
}
.Google:hover a:after {
  background: #e66a5a;
}

.Instagram a {
  background: #e4405f;
}
.Instagram:hover a {
  background: #e4405f;
}
.Instagram:hover a:before {
  background: #d81c3f;
}
.Instagram:hover a:after {
  background: #e46880;
}
.OnlyFans a {
  background: #01aef0;
}
.OnlyFans:hover a {
  background: #01aef0;
}
.OnlyFans:hover a:before {
  background: #0088c8;
}
.OnlyFans:hover a:after {
  background: #3db8f1;
}
</style>